<template>
  <div
    class="modal fade"
    id="ViewData"
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
              placeholder="Search Signals You Reported"
            />
          </div>
        </div>
        <div class="modal-body">
          <div>
            <div>
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
                        <i
                          class="me-2 fas fa-circle-notch text-danger me-2"
                        ></i>
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
                            class="btn btn-danger DeleteMe btn-sm"
                            :data-id="record.id"
                            :data-tablename="tableName"
                            @click="deleteSignal(record.id)"
                          >
                            <i class="fas fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      provinces: [],
      recordCount: 0,
      provinceId: null,
      searchTerm: "",
      tableName: "report_signals",
      excludedColumns: [],
      records: [],
      titleColumnName: "EbsSignal",
      ignoredColumns: [],
      SERVER_URL: window.SERVER_URL,
    };
  },
  mounted() {
    this.fetchAndDisplayData(); // Call once on component mounted to load data initially
    setInterval(() => {
      this.fetchAndDisplayData();
    }, 2000);
    console.log(sessionStorage.getItem("UserID") + " This is the user id");
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
  mounted() {

    this.fetchAndDisplayData();
    setInterval(this.fetchAndDisplayData, 2000); 

  },
  methods: {
    formatColumnName(name) {
      return name
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .trim();
    },
    async fetchAndDisplayData() {
      try {
        const {
          data: { records },
        } = await axios.post(`${this.SERVER_URL}fetchCebsMyReportedSignals`, {
          UserID: sessionStorage.getItem("UserID"),
        });

        if (!Array.isArray(records) || records.length === 0) {
        console.log('Empty record set');
        }

        if (records.length !== this.recordCount) {
          console.log(records);
          this.records = records;
          this.recordCount = records.length;
        }
      } catch (error) {
        console.error("Error fetching records:", error);
        // Clear existing records on error or when no records are fetched
        this.records = [];
        this.recordCount = 0;
      }
    },
  },
  created() {
    this.fetchAndDisplayData();
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

  setup() {
    const deleteSignal = async (id) => {
      try {
        const response = await axios.post(
          `${window.SERVER_URL}deleteReportSignal`,
          { id }
        );

        // Check if "error_a" exists in the response, if it does it means an error occurred
        let isError = response.data.hasOwnProperty("error_a");

        Swal.fire({
          icon: isError ? "error" : "success",
          title: isError ? "Error" : "Success",
          text: response.data.message,
        });
      } catch (error) {
        // In case of an unexpected error (network issue, server crash, etc.)
        console.log(error);
      }
    };

    return { deleteSignal };
  },
};
</script>
