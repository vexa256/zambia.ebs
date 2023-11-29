<template>
   <div>
    <div class="wiz-element col-md-12 my-3 py-3">
      <label id="label" for="" class="required form-label my-1 py-1">Escalates To</label>
      <select
        class="form-select EscalatesToRoleID form-control form-select-light"
        data-placeholder="Select an option"
        name="EscalatesToRoleID">
        <option value="">Select an option</option>
       
      </select>
    </div>


   

    <div class="wiz-element col-md-12 my-3 py-3">
      <label id="label" for="" class="required form-label my-1 py-1">Official Designation</label>
      <select
        class="form-select EscalatesToRoleID form-control form-select-light"
        data-placeholder="Select an option"
        name="OfficialDesignation">
        <option value="">Select an option</option>
       
      </select>
    </div>



    <div class="wiz-element col-md-12 my-3 py-3">
      <label id="label" for="" class="required form-label my-1 py-1">Parent CHV Group</label>
      <select
        class="form-select ChvGroup form-control form-select-light"
        data-placeholder="Select an option"
        name="ChvGroupID">
        <option value=""></option>
       
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

    mounted() {
        window.ClassBasedFetchSelect(
        "EscalatesToRoleID",
        "FetchDesignations",
        "Designation",
        "DesignationID"
      );

      window.ClassBasedFetchSelect(
        "ChvGroup",
        "FetchChvGroups",
        "ChvGroupName",
        "ChvGroupID",
        '<option value="NA">Not Applicable</option>'
      );
    }
  };
  </script>
  