<template>
  <div>
    <div
      class="card-body mb-3 pb-3 pe-2 bg-light table-responsive container-fluid"
    >
      <router-link to="/Ra" class="btn btn-sm float-end mt-3 btn-dark ms-2">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
    </div>
    <div class="card-body px-5 py-5 bg-light table-responsive">
      <form method="POST" id="RiskAssessmentForm">
        <div id="CebsSignalVerifyForm"></div>
        <div class="wiz-element col-md-12 my-3 py-3">
          <label id="label" for="" class="required form-label my-1 py-1"
            >Risk Classification</label
          >
          <select
            id=""
            class="form-select EE-BS-FS form-control form-select-light"
            data-placeholder="Select an option"
            name="RiskAssessmentDetails"
          >
            <option value=""></option>
            <option value="Very Low">Very Low</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>

        <div class="wiz-element col-md-12 my-3 py-3">
          <label id="label" for="" class="required form-label my-1 py-1"
            > Risk Assessment Details</label
          >
          <textarea
            name="RiskAssessmentDetails"
            class="form-select EE-BS-FS form-control"
          >

              Enter Text Here

           </textarea
          >
        </div>
        <div class="wiz-element col-md-12 my-3 py-3">
          <label id="label" for="" class="required form-label my-1 py-1"
            >Select Response Action</label
          >
          <select
            id=""
            class="form-select EE-BS-FS form-control form-select-light"
            data-placeholder="Select an option"
            name="RecommendedAction"
          >
            <option value=""></option>
            <option value="VERY LOW - Stop Assessment and continue monitoring ">
              VERY LOW Stop Assessment and continue monitoring
            </option>
            <option
              value="LOW - Continue to monitor and repeat risk assessment if the situation changes"
            >
              LOW - Continue to monitor and repeat risk assessment if the
              situation changes
            </option>
            <option
              value="MODERATE - Discuss with relevant authorities and communities affected for solution"
            >
              MODERATE - Discuss with relevant authorities and communities
              affected for solution
            </option>
            <option
              value="HIGH - Consider deployment in affected areas, in consultation  with relevant authorities"
            >
              HIGH - Consider deployment in affected areas, in consultation with
              relevant authorities
            </option>
            <option value="VERY HIGH - Consider deployment with national support">
              VERY HIGH Consider deployment with national support
            </option>
          </select>
        </div>
        <input
          type="text"
          name="PostRoute"
          value="RiskAssessEvent"
          class="d-none"
        />
        <input
          type="text"
          name="TableName"
          value="risk_assements"
          class="d-none"
        />

        <input
          type="hidden"
          name="RiskAssessmentStatus"
          class="RiskAssessmentStatus"
          value="Assessed"
        />

        <input
          type="hidden"
          name="RiskAssessmentDate"
          ref="RiskAssessmentDate"
        />

        <input type="hidden" name="RiskAssessmentByUserID" ref="userIDInput" />
        <input type="hidden" name="ReportID" ref="ReportID" />
      </form>
    </div>

    <div class="card-header mt-3">
      <h1
        class="page-heading alert text-dark d-flex fw-bold fs-3 flex-column justify-content-center my-0"
      >
        Currently Selected Events's Info
      </h1>
    </div>

    <div class="mt-3 pt-2 list-group" id="accordionExample">
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
                  <strong class="col-6 key-class">{{
                    formatColumnName(key)
                  }}</strong>
                  <span class="col-6 fw-bold text-primary">{{ value }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      
      </div>
    </div>

  
  </div>
</template>
<style scoped>
.key-class {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  /* max-width: 90%; */
}
</style>
<script>
export default {
  components: {
  
  },
  data() {
    return {
      provinces: [],
      provinceId: null,
      searchTerm: "",
      ReportID: localStorage.getItem("VerifyReportID"),
      columns: [
        "ReportID",
        "RiskAssessmentDate",
        "RiskAssessmentByUserID",
        "RiskAssessmentStatus",
        "RiskAssessmentByUserID",
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
      tableName: "risk_assements",
      excludedColumns: [
        "created_at",
        "updated_at",
        "RiskAssessmentDate",
        "RiskAssessmentByUserID",
        "RiskAssessmentStatus",
        "RiskAssessmentByUserID",
        "RiskAssessmentDetails",
        "DelayStatus",
        "RecommendedAction",
        "ReportID",
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
    let date = new Date();
    let currentDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    this.$refs.userIDInput.value = sessionStorage.getItem("UserID");
    this.$refs.ReportID.value = localStorage.getItem("VerifyReportID");
    this.$refs.RiskAssessmentDate.value = currentDate;

    const verifyingUserInput = document.querySelector(".VerifyingUserID");
    if (verifyingUserInput) {
      verifyingUserInput.value = sessionStorage.getItem("UserID");
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
    window.SetMyPageTitle("Risk Assessment Actions");

    window.ButtonActions(".DeleteMe", "Delete", () =>
      this.fetchAndDisplayData()
    );

    setRandomId();
    setCreatedAtValue();
    SendFormEngine("RiskAssessmentForm", () => this.fetchAndDisplayData());
    SendFormEngine("UpdateFormData", () => this.fetchAndDisplayData());
    window.removeElementsWithXIdClass();

    window.ClassBasedFetchSelect(
      "ward-select",
      "FetchWards",
      "WardName",
      "WardID"
    );

    window.PopulateHealthFacilities();
    window.FormEngine(
      this.tableName,
      this.excludedColumns,
      "#CebsSignalVerifyForm",
      12,
      12
    );
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
    FetchFormHiddenAttributes() {},
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
        } = await axios.post(
          `${this.SERVER_URL}FetchCebsRiskAssessmentSignal`,
          {
            ReportID: ReportID,
          }
        );

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
