<template>
    <div class="col-12 mt-4">
      <!-- Table for statistics -->
     <!-- Top 5 Reporting Districts Card -->
<div class="card bg-dark text-light fw-bolder hoverable card-xl-stretch mb-5 mb-xl-8">
    
        <div class="card-header">
            <h1 class="card-title text-light fw-bolder">
                Top Five Reporting Districts
            </h1>
        </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="thead-light text-light">
                    <tr class="text-light">
                        <th scope="col">District</th>
                        <th scope="col">Number of Reports</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(district, index) in top5Districts" :key="index" class="text-light">
                        <td>{{ district.DistrictName }}</td>
                        <td>{{ district.count }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Least 5 Reporting Districts Card -->
<div class="card bg-primary text-light fw-bolder hoverable card-xl-stretch mb-5 mb-xl-8">
    <div class="card-header">
            <h1 class="card-title text-light fw-bolder">
                Least Five Reporting Districts
            </h1>
        </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="thead-light text-light">
                    <tr class="text-light">
                        <th scope="col">District</th>
                        <th scope="col">Number of Reports</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(district, index) in least5Districts" :key="index" class="text-light">
                        <td>{{ district.DistrictName }}</td>
                        <td>{{ district.count }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

    
      <!-- Bar chart -->
      <div class="card bg-light hoverable card-xl-stretch mb-3 mt-5 mb-xl-5">
        <div class="card-body">
          <canvas id="barChart" style="height: 300px"></canvas>
        </div>
      </div>
  
      <!-- Line chart -->
      <div class="card bg-light hoverable card-xl-stretch mb-3 mt-5 mb-xl-5">
        <div class="card-body">
          <canvas id="lineChart" style="height: 300px"></canvas>
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
        unAssessedSignals: 0,
        assessedSignals: 0,
        top5Districts: [],
        least5Districts: [],
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
  
        // Fetch signal statistics as before...
  
        // Use Promise.all() to ensure both requests are done before updating charts
        Promise.all([
          // Fetch top 5 reporting districts
          axios.get(this.SERVER_URL + "Top5ReportingByDistrict")
            .then((response) => {
              this.top5Districts = response.data.result;
            }),
  
          // Fetch least 5 reporting districts
          axios.get(this.SERVER_URL + "Least5ReportingByDistrict")
            .then((response) => {
              this.least5Districts = response.data.result;
            }),
        ])
        .then(() => {
          this.updateCharts();
        })
        .catch((error) => {
          console.log(error);
        });
      },
  
      startChartUpdates() {
        this.chartInterval = setInterval(this.fetchSignalStatistics, 100000);
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
        const labels = this.top5Districts.map(district => district.DistrictName);
        const data = this.top5Districts.map(district => district.count);
  
        new Chart("barChart", {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Top 5 Reporting Districts",
                data,
                backgroundColor: ["red", "blue", "green", "yellow", "purple"],
                borderColor: ["blue", "green", "red", "purple", "yellow"],
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
                text: "Bar Chart: Top 5 Reporting Districts",
                fontSize: 20,
              },
            },
          },
        });
      },
  
      drawLineChart() {
        const labels = this.least5Districts.map(district => district.DistrictName);
        const data = this.least5Districts.map(district => district.count);
  
        new Chart("lineChart", {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Least 5 Reporting Districts",
                data,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
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
                text: "Line Chart: Least 5 Reporting Districts",
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
  #lineChart {
    width: 100% !important;
  }
  
  .bordered-table th,
  .bordered-table td {
    border: 1px solid #dee2e6;
  }
  </style>
  