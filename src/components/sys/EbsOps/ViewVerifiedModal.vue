<template>
    <div>
        <div
      class="modal fade"
      id="ViewVerified"
      aria-labelledby="ViewDataLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header shadow-lg">
            <div class="col-12">
              <input
                type="text"
                class="form-control float-end mt-4"
                v-model="searchTerm"
                placeholder="Signals You Verified"
              />
            </div>
          </div>
          <div class="modal-body">
            <div>
              <div class="list-group shadow-lg" id="accordionExample">
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
                    @click="console.log('This is the record ' + record.id)"
                  >
                    <h5 class="mb-1 text-danger fw-bolder">
                      <i class="me-2 fas fa-circle-notch text-danger me-2"></i>
                      {{ record[titleColumnName] }}
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
                            <span class="fw-bold text-primary">{{
                              value
                            }}</span>
                          </div>
                        </li>
                      </ul>
                      <div class="card-body text-center">
                      

                        <button
                          type="button"
                          class="btn btn-danger  btn-sm ms-5"
                          :data-id="record.id"
                          :data-tablename="tableName"
                          @click="VerifySignal(record.ReportID)"
                        >
                          <i class="fas fa-check"></i> Verification Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";

import axios from "axios";

export default {
  
  data() {
    return {
      provinces: [],
      recordCount: 0,
      provinceId: null,
      searchTerm: "",
      tableName: "report_signals",
      excludedColumns: ["created_at", "updated_at"],
      records: [],
      titleColumnName: "EbsSignal",
      ignoredColumns: [
        "created_at",
        "updated_at",
        "SignalID",
        "ReportID",
        "UserID",
        "TriagingStatus",
        "HFID",
        "name",
        "email",
        "Email",
        "Role",
        "WardID",
        "Constituency",
        "ChvGroupID",
        "remember_token",
        "VillageID",
        "HealthFacilityID",
        "EbsSignalCategoryID",
      ],
      SERVER_URL: window.SERVER_URL,
      intervalId: null,
    };
  },

  methods: {
    fetchRecords() {
      const UserID = sessionStorage.getItem("UserID");
      axios
        .post(`${this.SERVER_URL}FetchVerifiedCebsSignals`, {
          UserID: UserID,
          ignoredColumns: this.ignoredColumns,
        })
        .then((response) => {
          const newRecordCount = Array.isArray(response.data.records)
            ? response.data.records.length
            : Object.values(response.data.records).length;

          if (newRecordCount !== this.recordCount) {
            this.recordCount = newRecordCount;
            this.records = Array.isArray(response.data.records)
              ? response.data.records
              : Object.values(response.data.records);
          }
        })
        .catch((error) => {
          console.log(error);
          this.records = [];
        });
    },

    RemoveX_ReportID() {
      let attempts = 0;
      const maxAttempts = 10;
      const intervalTime = 1000; // Check every second

      const intervalId = setInterval(() => {
        const elements = document.getElementsByClassName("x_ReportID");

        if (elements.length > 0) {
          // If the elements are found, remove each of them and clear the interval
          while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
          }
          clearInterval(intervalId);
        } else if (attempts >= maxAttempts) {
          // If the elements aren't found after maxAttempts, clear the interval
          clearInterval(intervalId);
        }

        attempts++;
      }, intervalTime);
    },

    VerifySignal(ReportID) {
      return new Promise((resolve, reject) => {
        try {
          localStorage.setItem("VerifyReportID", ReportID); // Save ReportID in session storage

          console.log(ReportID);

          this.$router
          this.$router.push("/ViewVerifyReport")
 // Navigate to the route 'verify logic'
            .then(() => resolve("Navigation Successful"))
            .catch((error) => reject("Navigation failed: " + error));
        } catch (error) {
          reject("VerifySignal function failed: " + error);
        }
      });
    },

    DiscardSignal(ReportID){
      Swal.fire({
        title: "Confirm Discard",
        text: "Are you sure you want to discard this signal?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, discard it",
        cancelButtonText: "No, don't discard it",
        dangerMode: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const UserID = sessionStorage.getItem("UserID");
          axios
            .post(window.SERVER_URL + "DiscardTheCebsSignal", {
              VerifyingUserID: UserID,
              ReportID: ReportID,
            })
            .then((response) => {
              Swal.fire("Success!", response.data.status, "success");

              this.fetchRecords();
            })
            .catch((error) => {
              Swal.fire(
                "Error!",
                "An error occurred while discarding the signal.",
                "error"
              );
            });
        } else {
          console.log("Discard cancelled");
        }
      });
    },

    formatColumnName(name) {
      return name
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .trim();
    },

    updateData() {
      this.fetchRecords();
    },

    startDataUpdates() {
      this.intervalId = setInterval(this.updateData, 2000);
    },

    stopDataUpdates() {
      clearInterval(this.intervalId);
    },
  },

  created() {
    this.fetchRecords();
  },

  mounted() {
    window.removeElementsWithXIdClass();
    this.RemoveX_ReportID();
    window.SetMyPageTitle("Signals Verification and Past 30 day stats");
    this.startDataUpdates();
  },

  beforeUnmount() {
    this.stopDataUpdates();
  },

  computed: {
    filteredRecords() {
      if (!this.searchTerm || !Array.isArray(this.records)) {
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