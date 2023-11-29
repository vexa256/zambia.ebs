<template>
  <div
    class="modal fade"
    id="ViewVerifyDatas"
    aria-labelledby="ViewDataLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-body">
          <div v-if="records.length > 0">
            <div class="list-group shadow-lg" id="accordionExample">
              <div
                class="list-group-item"
                v-for="(record, index) in records"
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
                    Signal Verification Report
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
                      >
                        <div class="row py-3">
                          <strong class="col-6 key-class">{{
                            formatKey(key)
                          }}</strong>
                          <span class="col-6 fw-bold text-primary">{{
                            value
                          }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-muted">
            <h2>Selected Signal Not Yet verified</h2>
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
<style scoped>
.key-class {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  /* max-width: 90%; */
}
</style>
<script>
import axios from "axios";

export default {
  data() {
    return {
      records: [],
      fetchDataInterval: null,
      ReportID: localStorage.getItem("VerifyReportID"),
    };
  },
  methods: {
    fetchData() {
      axios
        .post(window.SERVER_URL + "CebsSignalVerificationReport", {
          ReportID: this.ReportID,
        })
        .then((response) => {
          this.records = response.data.records;
          //  console.log(response.data.records);
          //  console.log(response.data.ReportID);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    formatKey(key) {
      // convert camelCase or snake_case to separate words
      let result = key
        .replace(/([A-Z])/g, " $1") // insert a space before all caps
        .replace(/_/g, " ") // replace underscores with spaces
        .toLowerCase(); // convert to lowercase

      // capitalize the first letter
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
    startFetchDataInterval() {
      this.fetchDataInterval = setInterval(() => {
        this.fetchData();
      }, 3000);

      setTimeout(() => {
        clearInterval(this.fetchDataInterval);
      }, 100000);
    },
  },
  mounted() {
    this.fetchData();
    // alert(this.ReportID);
    this.startFetchDataInterval();
  },
  beforeDestroy() {
    clearInterval(this.fetchDataInterval);
  },
};
</script>
