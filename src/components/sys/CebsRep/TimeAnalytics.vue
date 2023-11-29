<template>
    <div class="col-12 mt-4">
        <!-- Table for statistics -->
        <div class="card bg-dark text-light fw-bolder hoverable card-xl-stretch mb-5 mb-xl-8">
            <div class="card-header">
                <h1 class="card-title text-light fw-bolder">
                    Time Response Analytics
                </h1>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="thead-light text-light">
                            <tr class="text-light">
                                <th scope="col">Category</th>
                                <th scope="col">Total Records</th>
                                <th scope="col">Delayed</th>
                                <th scope="col">On Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-light">
                                <td>Verifications</td>
                                <td>{{ timeResponseAnalytics.verifications[0].total_records }}</td>
                                <td>{{ timeResponseAnalytics.verifications[0].delayed_records }}</td>
                                <td>{{ timeResponseAnalytics.verifications[0].ontime_records }}</td>
                            </tr>
                            <tr class="text-light">
                                <td>Triages</td>
                                <td>{{ timeResponseAnalytics.triages[0].total_records }}</td>
                                <td>{{ timeResponseAnalytics.triages[0].delayed_records }}</td>
                                <td>{{ timeResponseAnalytics.triages[0].ontime_records }}</td>
                            </tr>
                            <tr class="text-light">
                                <td>Risk Assessments</td>
                                <td>{{ timeResponseAnalytics.risk_assessments[0].total_records }}</td>
                                <td>{{ timeResponseAnalytics.risk_assessments[0].delayed_records }}</td>
                                <td>{{ timeResponseAnalytics.risk_assessments[0].ontime_records }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      
    </div>
</template>

<script>
import {
  Chart,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import axios from "axios";

Chart.register(
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
  LineElement,
  PointElement,
  ArcElement
);

export default {
  data() {
    return {
      timeResponseAnalytics: {
        verifications: [{total_records: 0, delayed_records: 0, ontime_records: 0}],
        triages: [{total_records: 0, delayed_records: 0, ontime_records: 0}],
        risk_assessments: [{total_records: 0, delayed_records: 0, ontime_records: 0}],
      },
      SERVER_URL: window.SERVER_URL,
      chartInterval: null,
    };
  },

  created() {
    this.fetchTimeResponseAnalytics();
  },

  mounted() {

    window.SetMyPageTitle("Triaging , Verification and Risk Assessment time frames for the current year");
    // this.startChartUpdates();
  },

  beforeUnmount() {
    // this.stopChartUpdates();
  },

  methods: {
    fetchTimeResponseAnalytics() {
      axios.get(this.SERVER_URL + "TimeResponseAnalytics")
          .then((response) => {
            this.timeResponseAnalytics = response.data;
          
          })
          .catch((error) => {
            console.log(error);
          });
    },

    



  }
}
</script>

<style scoped>
  canvas {
    width: 100% !important;
    margin: auto;
  }
  
  #barChart,
  #lineChart {
    width: 100% !important;
  }
  
  .bordered-table th,
  .bordered-table td {
    border: 1px solid #dee2e6;
  }
  </style>
