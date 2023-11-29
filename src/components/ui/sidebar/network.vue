<template>
    <div>
      <div v-if="!networkStatus.online" id="offline-loader" class="overlay">
        <div class="loader"></div>
        <p class="offline-message">You are currently offline. We're trying to reconnect...</p>
      </div>
  
      <!-- The rest of your component's template goes here -->
    </div>
  </template>
  
  <script>
  import { inject } from 'vue';
  
  export default {
    setup() {
      const networkStatus = inject('networkStatus');
      return { networkStatus };
      
    },
  };
  </script>
  
  <style scoped>
  .overlay {
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 9000;
      cursor: pointer;
  }
  
  .loader {
      position: relative;
      margin-bottom: 15px;
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
  
  .offline-message {
      color: #ffffff;
      font-size: 20px;
      text-align: center;
  }
  </style>
  