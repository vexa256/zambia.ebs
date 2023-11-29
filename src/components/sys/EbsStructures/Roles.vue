<template>
    <div class=" wiz-element col-md-12 my-3 py-3">
      <label id="label" for="" class="required form-label my-1 py-1">Role</label>
      <select
        class="form-select form-control form-select-light"
        data-placeholder="Select an option"
        name="Role"
        v-model="selectedRole"
      >
        <option value="">Select an option</option>
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        roles: [
          "Reporting",
          "Triaging",
          "Verification",
          "Triaging and Verification",
          "Response",
          "Monitoring",
          "Facilitate Risk Assessment",
          "Risk Assessment",
          "Data Collection",
          "Data Analysis",
          "Outbreak Investigation",
          "Communication",
          "National Level Oversight",
        ],
        selectedRole: null
      };
    },
  };
  </script>
  