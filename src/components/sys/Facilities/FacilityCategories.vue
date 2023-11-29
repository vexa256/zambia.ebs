<template>
  <div class="mb-3 wiz-element col-md-12 my-1 py-1">
    <label id="label" for="" class="required form-label my-1 py-1"
      >Facility Category</label
    >
    <select
      id=""
      class="form-select form-control form-select-light"
      data-placeholder="Select an option"
      name="FacilityCategory"
      v-model="selectedFacility"
    >
      <option value="">Select an option</option>
      <option
        v-for="facility in publicHealthFacilities"
        :key="facility"
        :value="facility"
      >
        {{ facility }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicHealthFacilities: [],
      selectedFacility: "",
    };
  },
  async mounted() {
    // Assuming you have the array of facilities on the window object.
    this.publicHealthFacilities = window.publicHealthFacilities;
  },
};
</script>
