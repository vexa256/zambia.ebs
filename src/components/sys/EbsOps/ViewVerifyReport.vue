<template>
  <div>
    <div
      class="card-body mb-3 pb-3 pe-2 bg-light table-responsive container-fluid"
    >
      <router-link
        to="/CebsVerify"
        class="btn btn-sm float-end mt-3 btn-dark ms-2"
      >
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
    </div>

    <div class="card-header mt-3">
      <h1
        class="page-heading alert text-dark d-flex fw-bold fs-3 flex-column justify-content-center my-0"
      >
        View Signal Verification Report
      </h1>
    </div>

    <div class="mt-3 pt-2 list-group shadow-lg" id="accordionExample">
      <div
        class="list-group-item"
        v-for="(record, index) in filteredRecords"
        :key="index"
      >
        <div
          class="d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + index"
          :aria-expanded="index == 0"
          :aria-controls="'collapse' + index"
        >
          <h5 class="mb-1 text-danger fw-bolder">
            <i class="me-2 fas fa-circle-notch text-danger me-2"></i>
            {{ record[titleColumnName] }} | {{ record[titleColumnName2] }}
          </h5>
          <button class="btn btn-link text-secondary" type="button">
            <i class="fas fa-chevron-down"></i>
          </button>
        </div>
        <div
          :id="'collapse' + index"
          class="collapse"
          :class="{ show: index == 0 }"
          data-bs-parent="#accordionExample"
        >
          <div class="card mt-2">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="(value, key) in record"
                :key="key"
                v-if="!ignoredColumns.includes(key)"
                :class="`x_${key}`"
              >
                <div
                  class="d-flex justify-content-between py-3"
                  :class="`x_${key}`"
                >
                  <strong>{{ formatColumnName(key) }}</strong>
                  <span class="fw-bold text-primary">{{ value }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="card mt-2">
          <div class="card-body text-center">
            <button
              data-bs-toggle="modal"
              data-bs-target="#ViewVerifyDatas"
              type="button"
              class="btn btn-danger btn-sm ms-5"
            >
              <i class="fas fa-check"></i>
              Verification Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <CebsViewVerified />
  </div>
</template>

<script>
import CebsViewVerified from "./CebsViewVerified.vue";
export default {
  components: {
    CebsViewVerified,
  },
  data() {
    return {
      provinces: [],
      provinceId: null,
      searchTerm: "",
      ReportID: localStorage.getItem("VerifyReportID"),
      columns: [
        "ReportID",
        "VerificationID",
        "HealthFacilityID",
        "VerifyingUserID",
        "ProvinceID",
        "DistrictID",
        "ConstituencyID",
        "WardID",
        "VillageID",
      ],
      intervalId: null,
      elapsedSeconds: 0,
      tableName: "signal_verifications",
      excludedColumns: [
        "created_at",
        "updated_at",
        "ReportID",
        "VerificationID",
        "HealthFacilityID",
        "VerifyingUserID",
        "ProvinceID",
        "DistrictID",
        "ConstituencyID",
        "WardID",
        "VillageID",
        "WhatIsTheSignalSource",
        "DelayedVerificationStatus",
        "created_at",
        "updated_at",
      ],
      records: [],
      titleColumnName: "EbsSignal",
      titleColumnName2: "WardName",
      ignoredColumns: [
        "created_at",
        "updated_at",
        "ReportID",
        "VerificationID",
        "HealthFacilityID",
        "VerifyingUserID",
        "ProvinceID",
        "DistrictID",
        "ConstituencyID",
        "WardID",
        "VillageID",
        "WhatIsTheSignalSource",
        "DelayedVerificationStatus",
        "created_at",
        "updated_at",
      ],
      SERVER_URL: window.SERVER_URL,
    };
  },
  mounted() {
   

    const verifyingUserInput = document.querySelector(".VerifyingUserID");
    if (verifyingUserInput) {
      verifyingUserInput.value = sessionStorage.getItem("UserID");
    }
    const createdAtInput = document.querySelector(".created_atw");
    if (createdAtInput) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10);
      createdAtInput.value = formattedDate;
    }
    // setRandomIds();
    //

    this.intervalId = setInterval(() => {
      this.elapsedSeconds++;
      if (this.elapsedSeconds > 7) {
        console.log("Elements not found");
        clearInterval(this.intervalId);
        return;
      }

      let allElementsExist = this.columns.every((column) => {
        return !!document.querySelector("." + column);
      });

      if (allElementsExist) {
        this.FetchFormHiddenAttributes();
        clearInterval(this.intervalId);
      }
    }, 1000);
    //
    window.RemoveDisplayElements(this.ignoredColumns);
    window.fixSelectInModals();
    window.SetMyPageTitle("Manage CEBS Workflow Structure");

    window.ButtonActions(".DeleteMe", "Delete", () =>
      this.fetchAndDisplayData()
    );

    setRandomId();
    setCreatedAtValue();
    //   SendFormEngine("VerifyCebsSignal", () => this.fetchAndDisplayData());
    //   SendFormEngine("UpdateFormData", () => this.fetchAndDisplayData());
    window.removeElementsWithXIdClass();

    window.ClassBasedFetchSelect(
      "ward-select",
      "FetchWards",
      "WardName",
      "WardID"
    );

    window.PopulateHealthFacilities();
    //   window.FormEngine(
    //     this.tableName,
    //     this.excludedColumns,
    //     "#CebsSignalVerifyForm",
    //     12,
    //     12
    //   );

    // window.FetchSelect(
    //   "ward-select-update",
    //   "FetchVillages",
    //   "VillageName",
    //   "VillageID"
    // );
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  async created() {
    this.reloadPage();
    await this.fetchAndDisplayData();
    
  },
  methods: {
    reloadPage() {
      // Get the lastReload time from sessionStorage
      const lastReload = sessionStorage.getItem("lastReload");

      // Check if the page was reloaded within the last 4 seconds
      if (lastReload && new Date().getTime() - lastReload < 4000) {
        console.log(
          "Page reload canceled: page was reloaded less than 4 seconds ago."
        );
        return;
      }

      // Store the current time to sessionStorage
      sessionStorage.setItem("lastReload", new Date().getTime());

      // Reload the page
      location.reload();
    },

    FetchFormHiddenAttributes() {
      axios
        .post(`${this.SERVER_URL}FetchCebsVerifyAttributes`, {
          ReportID: this.ReportID,
        })
        .then((response) => {
          let records = response.data.records[0]; // Assuming that you want the first record

          // Iterate over each column
          this.columns.forEach((column) => {
            // Find the input with class name that matches the column name
            let input = document.querySelector("." + column);

            // If the input exists and the record has the column, set the input's value to the column's value
            if (input && records.hasOwnProperty(column)) {
              input.value = records[column];
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateRecord(id, tableName) {
      // Call your update function with the id and tableName
      // I am not sure about the other parameters, but you can replace them with the correct values
      window.UpdateEngine(
        tableName,
        this.excludedColumns,
        "#UpdateModalContent",
        12,
        12,
        id
      );

      this.fetchAndDisplayData();

      window.setElementValueWhenAvailable(".UpdateRecordID", id);
    },

    // Update the form

    formatColumnName(name) {
      return name
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .trim();
    },
    async fetchAndDisplayData() {
      try {
        const ReportID = localStorage.getItem("VerifyReportID");

        const {
          data: { records },
        } = await axios.post(`${this.SERVER_URL}CebsFetchVerifySignal`, {
          ReportID: ReportID,
        });

        if (!Array.isArray(records) || records.length === 0)
          throw "Invalid or empty records";

        console.log(records);
        this.records = records;
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    },
  },
  computed: {
    filteredRecords() {
      if (!this.searchTerm) {
        return this.records;
      }

      const normalizedSearchTerm = this.searchTerm.toLowerCase();
      return this.records.filter((record) => {
        const title = record[this.titleColumnName]?.toLowerCase();
        return title.includes(normalizedSearchTerm);
      });
    },
  },
};
</script>
