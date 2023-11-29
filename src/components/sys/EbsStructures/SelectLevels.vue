<template>
    <div>
        <div class="mb-3 wiz-element col-md-12 my-1 py-1">
            <label id="label" for="" class="required form-label my-1 py-1"
              >Administrative Level</label
            >
            <select
              id=""
              class="form-select form-control form-select-light"
              data-placeholder="Select an option"
              name="AdministrativeLevel"
            >
              <option value=""></option>
              <option value="Default">Default</option>
              <option value="National Level">National Level</option>
              <option value="Provincial Level">Provincial Level</option>
              <option value="District Level">District Level</option>
              <option value="Constituency Level">Constituency Level</option>
              <option value="Ward Level">Ward Level</option>
            </select>
          </div>


          <div class="mb-3 wiz-element col-md-12 my-1 py-1">
            <label id="label" for="" class="required form-label my-1 py-1"
              >Escalation Level</label
            >
            <select
              id=""
              class="form-select form-control form-select-light"
              data-placeholder="Select an option"
              name="ReportsToLevel"
            >
              <option value=""></option>
              <option value="Default">Default</option>
              <option value="National Level">National Level</option>
              <option value="Provincial Level">Provincial Level</option>
              <option value="District Level">District Level</option>
              <option value="Constituency Level">Constituency Level</option>
              <option value="Ward Level">Ward Level</option>
             
            </select>
          </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },


};
</script>