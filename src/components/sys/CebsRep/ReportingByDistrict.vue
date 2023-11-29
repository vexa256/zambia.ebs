<template>
  <div>
    <div class="container mt-3">
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

    <div class="row">
      <TopFiveDistricts />
    </div>
  </div>
</template>

<!-- Remaining script and styles remain the same -->

<script>
import axios from "axios";
import TopFiveDistricts from "./TopFiveDistricts.vue";

export default {
  components: {
    TopFiveDistricts,
   
  },
  data() {
    return {
      records: [],
      titleColumnName: "DistrictName",
      titleColumnName2: "count",
      ignoredColumns: [],
    };
  },
  mounted() {
    window.SetMyPageTitle("Signal Reporting By District Analytics for the current year");
    this.fetchAndDisplayData();
  },
  methods: {
    fetchAndDisplayData() {
      axios
        .get(window.SERVER_URL + "ReportingByDistrict")
        .then((response) => {
          if (response.data.result) {
            this.records = response.data.result;
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    formatColumnName(name) {
      return name
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .trim();
    },
  },
  watch: {
    records(newVal) {
      console.log("Records updated:", newVal);
    },
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
