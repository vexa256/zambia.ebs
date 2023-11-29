import axios from "axios";
import Swal from "sweetalert2";
import "./GlobalData";

window.FormEngine = (
  tableName,
  excludedColumns,
  formSelector,
  ColEditor = 12,
  Col = 4
) => {
  const SERVER_URL = window.SERVER_URL || "http://127.0.0.1:8000";
  const formElement = document.querySelector(formSelector);
  const formParent = formElement.closest("form"); // Parent form element

  const formTemplate = {
    integer: (name) =>
      `<input type="number" name="${name}" class="x_${name} form-control IntOnly" />`,
    float: (name) =>
      `<input type="number" name="${name}" class="x_${name} form-control IntOnly" />`,
    bigint: (name) =>
      `<input type="number" name="${name}" class="x_${name} form-control IntOnly" />`,
    double: (name) =>
      `<input type="number" name="${name}" class="x_${name} form-control IntOnly" />`,
    decimal: (name) =>
      `<input type="number" name="${name}" class="x_${name} form-control IntOnly" />`,
    date: (name) =>
      `<input type="text" name="${name}" class="x_${name} form-control DateArea" />`,
    datetime: (name) =>
      `<input type="text" name="${name}" class="x_${name} form-control DateArea" />`,
    editor: (name) =>
      `<textarea name="${name}" class="x_${name} form-control"></textarea>`,
    default: (name) =>
      `<input type="text" name="${name}" class="x_${name} form-control stringisme" />`,
    "wiz-element": (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const selectElements = doc.querySelectorAll("select");
      selectElements.forEach((selectElement) => {
        selectElement.setAttribute("data-control", "select2");
      });
      return doc.body.innerHTML;
    },
  };

  const fetchColumnDetails = async () => {
    const response = await axios.post(`${SERVER_URL}getColumnDetails`, {
      tableName,
      excludedColumns,
    });
    let columnData = response.data.columnData;

    const wizElements = formParent.querySelectorAll(".wiz-element");
    const wizData = Array.from(wizElements).map((element, index) => {
      const html = element.outerHTML;
      element.parentNode.removeChild(element);
      return {
        type: "wiz-element",
        html,
      };
    });

    columnData = [...wizData, ...columnData];

    const wizardPages = columnData.reduce((pages, field, index) => {
      const formElementHtml =
        field.type === "wiz-element"
          ? formTemplate["wiz-element"](field.html)
          : `
          <div class="mb-3 x_${field.name}">
            <label class="required form-label">${field.name
              .replace(/([A-Z])/g, " $1")
              .replace(/_/g, " ")
              .trim()}</label>
            ${(formTemplate[field.type] || formTemplate.default)(field.name)}
          </div>
        `;
      const currentPage = Math.floor(index / 2);
      pages[currentPage] = [...(pages[currentPage] || []), formElementHtml];

      return pages;
    }, []);

    formElement.innerHTML = `
      <div class="wizard-container">
        <form>
          ${wizardPages
            .map(
              (page, pageIndex) => `
            <div class="wizard-page" style="display: ${
              pageIndex === 0 ? "block" : "none"
            };">
              ${page.join("")}
            </div>
          `
            )
            .join("")}
        </form>
        <div class="wizard-buttons d-flex justify-content-between">
          <button class="wizard-prev-button btn btn-dark btn-sm shadow-lg">Previous</button>
          <button class="wizard-next-button  btn-sm btn btn-danger shadow-lg">Next</button>
        </div>
      </div>
    `;

    const prevButton = formElement.querySelector(".wizard-prev-button");
    const nextButton = formElement.querySelector(".wizard-next-button");
    const wizardPagesList = formElement.querySelectorAll(".wizard-page");
    let currentPageIndex = 0;

    const updatePage = (pageIndex) => {
      wizardPagesList.forEach((page, i) => {
        page.style.display = i === pageIndex ? "block" : "none";
      });

      prevButton.disabled = pageIndex === 0;
      nextButton.innerHTML =
        pageIndex === wizardPagesList.length - 1 ? "Submit" : "Next";
      currentPageIndex = pageIndex;
    };

    prevButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (currentPageIndex > 0) {
        updatePage(currentPageIndex - 1);
      }
    });

    nextButton.addEventListener("click", (event) => {
      if (currentPageIndex < wizardPagesList.length - 1) {
        event.preventDefault();
        updatePage(currentPageIndex + 1);
      }
    });

    updatePage(currentPageIndex);
  };

  if (formElement) {
    fetchColumnDetails();
  } else {
    console.error("Form element not found.");
  }
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    if (error) {
      console.log("Request error: ", error);
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // If the response is successful, just pass it along
    return response;
  },
  function (error) {
    // Do something with response error
    if (error && error.response && error.response.data) {
      if (
        Array.isArray(error.response.data) &&
        error.response.data[0].hasOwnProperty("error_a")
      ) {
        Swal.fire("Action Failed", error.response.data[0].error_a, "error");
        console.log("Data: ", error.response.data);
      } else {
        console.log("Data: ", error.response.data);
        console.log("Status: ", error.response.status);
        console.log("Headers: ", error.response.headers);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received: ", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    return Promise.reject(error);
  }
);
// Set Random Number for form IDs
window.setRandomId = () => {
  const randomIdElements = document.querySelectorAll(".randomid");
  if (randomIdElements.length > 0) {
    setInterval(() => {
      randomIdElements.forEach(randomIdElement => {
        const randomId = Math.floor(Math.random() * 900000000) + 100000000;
        randomIdElement.value = randomId;
      });
    }, 500);
  }
};


// CREATE TIMESTAMP
// Global function to set the value of 'created_at' elements
window.setCreatedAtValue = () => {
  const elements = document.getElementsByName("created_at");
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  for (let i = 0; i < elements.length; i++) {
    elements[i].value = timestamp;
  }
};

setInterval(setRandomId, 2000);


// Post all form elements to the database

window.SendFormEngine = function (formId, callback) {


  let attempts = 0;
  const interval = setInterval(() => {
    const form = document.getElementById(formId);

    if (form || attempts >= 20) {
      clearInterval(interval);

      if (!form) {
        console.log("Form not found attempts >= 20, This is not Fatal");
        return;
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();


        console.log('Form submitted');

        const postRouteInput = form.elements["PostRoute"];
        const postRoute = postRouteInput ? postRouteInput.value : null;

        if (!postRoute) {
          console.error("PostRoute not found in form");
          return;
        }

        const formData = new FormData(form);

        for (let value of formData.values()) {
          console.log(value); 
        }

        setCreatedAtValue(); // Call the setCreatedAtValue function here

        axios
          .post(SERVER_URL + postRoute, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            if (response.data[0].status) {
              Swal.fire(
                "Action Successful",
                response.data[0].status,
                "success"
              );
              if (callback) callback();
            }
          })
          .catch((error) => {
            if (error.response && error.response.data.errors) {
              const validationErrors = Object.values(error.response.data.errors)
                .flat()
                .join("\n");
              Swal.fire({
                title: "Validation Error!",
                text: validationErrors,
                icon: "error",
                confirmButtonText: "OK",
              });
            } else {
              console.error(error);
            }
          });
      });
    }

    attempts++;
  }, 400);
};


window.ButtonActions = function (selector, action, callback) {
  document.addEventListener("click", function (event) {
    if (event.target.matches(selector)) {
      const target = event.target.closest(selector);
      const tablename = target.dataset.tablename;
      const id = target.dataset.id;
      console.log(`${action} button clicked for:`, tablename, id);

      // Store in sessionStorage
      sessionStorage.setItem("ThisTableName", tablename);
      sessionStorage.setItem("ThisID", id);

      if (action === "Update") {
        // UpdateProvincesForm(tablename, id);
        if (callback) callback();
      } else if (action === "Delete") {
        // Show confirmation dialog before delete
        Swal.fire({
          title: "Are you sure you?",
          text:
            "You want to delete this record. You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(function (result) {
          if (result.isConfirmed) {
            // Perform delete action
            axios
              .post(`${SERVER_URL}MassDelete`, { TableName: tablename, id: id })
              .then(function (res) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                if (callback) callback();
              })
              .catch(function (error) {
                console.error(error);
                Swal.fire(
                  "Error!",
                  "There was a problem deleting the file.",
                  "error"
                );
              });
          }
        });
      }
    }
  });
};

// Update Form Engine,

window.UpdateEngine = async (
  tableName,
  excludedColumns,
  formSelector,
  ColEditor,
  Col,
  id
) => {
  console.log("Tablename " + tableName + " ID" + id);
  const fetchAndPopulateForm = async (id) => {
    try {
      // Fetch column details
      let response = await axios.post(SERVER_URL + "getColumnDetails", {
        tableName: tableName,
        excludedColumns: excludedColumns,
      });

      const data = response.data.columnData;

      // Fetch specific record
      response = await axios.post(SERVER_URL + "FetchSpecificRecords", {
        TableName: tableName,
        id: id,
        excludedColumns: excludedColumns,
      });

      const recordData = response.data.records[0];
      console.log(recordData);

      // Generate form HTML
      const formHtml = data
        .map((field) => {
          const name = field.name;
          const type = field.type;
          const col = type === "editor" ? ColEditor : Col;
          const placeholder = "";
          let inputType = "text";
          let extraClass = "";

          if (
            type === "integer" ||
            type === "float" ||
            type === "bigint" ||
            type === "double" ||
            type === "decimal"
          ) {
            inputType = "number";
            extraClass = "IntOnly";
          } else if (type === "date" || type === "datetime") {
            extraClass = "DateArea";
          } else {
            inputType = "text";
            extraClass = "stringisme";
          }

          const label = name
            .replace(/([A-Z])/g, " $1")
            .replace(/_/g, " ")
            .trim();

          const value = recordData[name] || ""; // Get the value from recordData
          console.log("This is the value " + value);
          return `
                <div class="col-md-${col} mb-3 mt-3 x_${name}">
                  <div class="mb-3">
                    <label class="required form-label">${label}</label>
                    ${
                      type === "editor"
                        ? `<textarea name="${name}" class="${name} form-control ${extraClass}">${value}</textarea>` // Inject value directly
                        : `<input required type="${inputType}" name="${name}" class="${name} form-control ${extraClass}" placeholder="${placeholder}" value="${value}" />` // Inject value directly
                    }
                  </div>
                </div>`;
        })
        .join("");

      const formElement = document.querySelector(formSelector);
      if (formElement) {
        formElement.innerHTML = formHtml;
      }
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  };

  fetchAndPopulateForm(id);
};

// Remove elements with class x_id

window.removeElementsWithXIdClass = () => {
  // Start observing the target node for configured mutations
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        window.removeElementsByClass("x_id");
      }
    }
  });

  // Configuration of the observer:
  const config = { attributes: false, childList: true, subtree: true };

  // Pass in the target node, as well as the observer options
  observer.observe(document.body, config);
};

window.removeElementsByClass = (className) => {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

// Insert all forms to the DB ,


window.setElementValueWhenAvailable = function (selector, value) {
  // Define a new observer
  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);

    // If the element exists
    if (element) {
      // Set the element's value
      element.value = value;

      // Stop observing
      observer.disconnect();
    }
  });

  // Configuration of the observer
  const config = { childList: true, subtree: true };

  // Observe mutations to the entire document
  observer.observe(document, config);
};

// set page titles
window.SetMyPageTitle = (string) => {
  // Define a MutationObserver instance and provide a callback function
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        const headerElement = document.getElementById("MyPageHeader");
        if (headerElement) {
          const currentText = headerElement.innerHTML.trim();
          if (currentText !== string) {
            headerElement.innerHTML = string;
          }
          observer.disconnect(); // Disconnect the observer if element found and updated
        }
      }
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document, { childList: true, subtree: true });
};

window.FetchSelect = function (
  elementid,
  server_path,
  DisplayColumn,
  ValueColumn
) {
  const provinceSelect = document.getElementById(elementid);

  async function fetchData() {
    try {
      const response = await axios.post(window.SERVER_URL + server_path, {
        excludedColumns: ["created_at", "updated_at"],
      });

      if (response.data && response.data.records) {
        const provinces = response.data.records;

        provinces.forEach(function (province) {
          const option = document.createElement("option");
          option.value = province[ValueColumn]; // using square brackets to access property
          option.text = province[DisplayColumn]; // using square brackets to access property
          provinceSelect.appendChild(option);
        });

        removeDuplicates(provinceSelect);
      }
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
    }
  }

  function removeDuplicates(selectElement) {
    let optionValues = new Set();
    for (let i = 0; i < selectElement.options.length; i++) {
      const optionValue = selectElement.options[i].value;
      if (optionValues.has(optionValue)) {
        selectElement.remove(i);
        i--;  // Adjust index because an option was removed
      } else {
        optionValues.add(optionValue);
      }
    }
  }

  fetchData();
};

window.ClassBasedFetchSelect = function (
  elementClass,
  server_path,
  DisplayColumn,
  ValueColumn,
  ExtraOption = null
) {
  const elements = document.querySelectorAll("." + elementClass);

  async function fetchData() {
    try {
      const response = await axios.post(window.SERVER_URL + server_path, {
        excludedColumns: ["created_at", "updated_at"],
      });

      if (response.data && response.data.records) {
        const records = response.data.records;

        elements.forEach((element) => {
          if (ExtraOption && !element.innerHTML.includes(ExtraOption)) {
            element.insertAdjacentHTML('afterbegin', ExtraOption);
          }

          records.forEach(function (record) {
            const optionValue = record[ValueColumn];
            const optionText = record[DisplayColumn];

            const option = document.createElement("option");
            option.value = optionValue;
            option.text = optionText;
            element.appendChild(option);
          });
          
          removeDuplicates(element);
        });
      }
    } catch (error) {
      console.error("Failed to fetch records:", error);
    }
  }

  function removeDuplicates(selectElement) {
    // If the selectElement is null or undefined, return immediately
    if (!selectElement) {
      return;
    }
  
    let optionValues = new Set();
    for (let i = 0; i < selectElement.options.length; i++) {
      const optionValue = selectElement.options[i].value;
      if (optionValues.has(optionValue)) {
        selectElement.remove(i);
        i--;  // Adjust index because an option was removed
      } else {
        optionValues.add(optionValue);
      }
    }
  }
  

  fetchData();
};








// Remove elements from display

window.RemoveDisplayElements = (ignoredColumns) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        ignoredColumns.forEach(function (column) {
          const elements = document.getElementsByClassName("x_" + column);
          for (let i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
          }
        });
      }
    });
  });

  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };

  observer.observe(document.body, config);
};



