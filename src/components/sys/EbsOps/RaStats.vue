<template>
  <div class="col-12">
    <!-- Table for statistics -->

    <div
      class="card bg-dark text-light fw-bolder hoverable card-xl-stretch mb-5 mb-xl-8"
    >
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="thead-light text-light">
              <tr class="text-light">
                <th scope="col">Signal Category</th>
                <th scope="col">Number</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-light">
                <td>UnAssessed</td>
                <td>{{ unAssessedSignals }}</td>
              </tr>
              <tr class="text-light">
                <td>Assessed</td>
                <td>{{ assessedSignals }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Bar chart -->
    <div class="card bg-light hoverable card-xl-stretch mb-3 mb-xl-5">
      <div class="card-body">
        <canvas id="barChart" style="height: 300px"></canvas>
      </div>
    </div>

    <!-- Line chart -->
    <div class="card bg-light hoverable card-xl-stretch mb-3 mb-xl-5">
      <div class="card-body">
        <canvas id="lineChart" style="height: 300px"></canvas>
      </div>
    </div>

    <!-- Pie chart -->
  </div>
</template>

<script>
import {
  Chart,
  BarController,
  LineController,
  PieController,
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
  PieController,
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
      unAssessedSignals: 0,
      assessedSignals: 0,
      SERVER_URL: window.SERVER_URL,
      chartInterval: null,
    };
  },

  created() {
    this.fetchSignalStatistics();
  },

  mounted() {
    this.startChartUpdates();
  },

  beforeUnmount() {
    this.stopChartUpdates();
  },

  methods: {
    fetchSignalStatistics() {
      const UserID = sessionStorage.getItem("UserID");

      axios
        .post(this.SERVER_URL + "CebsAssessmentSignalStats", { UserID })
        .then((response) => {
          const newUnAssessedSignals = response.data.UnAssessed;
          const newAssessedSignals = response.data.Assessed;

          if (
            newUnAssessedSignals !== this.unAssessedSignals ||
            newAssessedSignals !== this.assessedSignals
          ) {
            this.unAssessedSignals = newUnAssessedSignals;
            this.assessedSignals = newAssessedSignals;

            this.updateCharts();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    startChartUpdates() {
      this.chartInterval = setInterval(this.fetchSignalStatistics, 1000);
    },

    stopChartUpdates() {
      clearInterval(this.chartInterval);
    },

    updateCharts() {
      this.destroyCharts();
      this.drawBarChart();
      this.drawLineChart();
    },

    destroyCharts() {
      Chart.getChart("barChart")?.destroy();
      Chart.getChart("lineChart")?.destroy();
    },
    drawBarChart() {
  new Chart("barChart", {
    type: "bar",
    data: {
      labels: ["UnAssessed", "Assessed"],
      datasets: [
        {
          label: "Signal Statistics",
          data: [this.unAssessedSignals, this.assessedSignals],
          backgroundColor: ["red", "blue"],
          borderColor: ["blue", "green"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Bar Chart: Signal Statistics",
          fontSize: 20,
        },
      },
    },
  });
},

drawLineChart() {
  new Chart("lineChart", {
    type: "line",
    data: {
      labels: ["UnAssessed", "Assessed"],
      datasets: [
        {
          label: "Signal Statistics",
          data: [this.unAssessedSignals, this.assessedSignals],
          backgroundColor: ["red", "blue"],
          borderColor: ["blue", "green"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Line Chart: Signal Statistics",
          fontSize: 20,
        },
      },
    },
  });
},

  },
};
</script>

<style scoped>
canvas {
  width: 100% !important;
  margin: auto;
}

#barChart,
#lineChart,
#pieChart {
  width: 100% !important;
}

.bordered-table th,
.bordered-table td {
  border: 1px solid #dee2e6;
}
</style>
