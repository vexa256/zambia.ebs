<template>
    <div class="fab">
      <button @click="refreshPage" class="btn btn-dark btn-sm">
        <i class="fas fa-refresh"></i>

      </button>
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  export default {
    components: {
      FontAwesomeIcon
    },
    methods: {
      refreshPage() {
        this.$router.go();
      },
    },
  };
  </script>
  
  <style scoped>
  .fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  .fab .btn {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  