<template>
    <div class="col-12">
      <!-- Table for Verification statistics -->
      <div class="card bg-dark text-light fw-bolder hoverable card-xl-stretch mb-5 mb-xl-8">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="thead-light text-light">
                <tr class="text-light">
                  <th scope="col">Category</th>
                  <th scope="col">Number</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in verificationCounts" :key="key" class="text-light">
                  <td>{{ key }}</td>
                  <td>{{ value }}</td>
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
    </div>
  </template>
  
  <script>
  import { Chart, BarController, CategoryScale, LinearScale, Title, Tooltip, BarElement } from 'chart.js';
  import axios from 'axios';
  
  Chart.register(BarController, CategoryScale, LinearScale, Title, Tooltip, BarElement);
  
  export default {
    data() {
      return {
        SERVER_URL: window.SERVER_URL,
        verificationCounts: {},
        chart: null
      };
    },
    created() {
      window.SetMyPageTitle("Reported Vs Verified Analytics For the Current Year ");
      this.fetchVerificationCounts();
    },
    methods: {
      fetchVerificationCounts() {
        axios.get(this.SERVER_URL + "ReportedVsVerified")
          .then((response) => {
            this.verificationCounts = response.data;
            this.drawBarChart();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      drawBarChart() {
        if (this.chart) this.chart.destroy();
  
        const labels = Object.keys(this.verificationCounts);
        const data = Object.values(this.verificationCounts);
  
        this.chart = new Chart('barChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Verification Statistics',
                data: data,
                backgroundColor: 'red',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 4
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Bar Chart: Verification Statistics',
                fontSize: 20
              }
            }
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  canvas {
    width: 100% !important;
    margin: auto;
  }
  
  #barChart {
    width: 100% !important;
  }
  
  .bordered-table th,
  .bordered-table td {
    border: 1px solid #dee2e6;
  }
  </style>
  