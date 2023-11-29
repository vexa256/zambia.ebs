<template>
  <div>
    <div class="card card-xl-stretch mb-5 mb-xl-8">
      <!--begin::Header-->
      <div class="card-header border-0">
        <h3 class="card-title fw-bold text-dark">CEBS Operations</h3>
      </div>
      <!--end::Header-->
      <!--begin::Body-->
      <div class="card-body pt-0">
        <!--begin::Item-->
        <router-link to="/EbsReportSignals">
          <div
            class="d-flex shadow-lg align-items-center bg-danger rounded p-5 mb-7"
          >
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg-->
            <span class="svg-icon svg-icon-warning svg-icon-1 me-5">
              <i class="fas text-light fw-bolder fa-flag"></i>
            </span>
            <!--end::Svg Icon-->
            <!--begin::Title-->
            <div class="flex-grow-1 me-2">
              <a href="#" class="fw-bold text-light text-hover-primary fs-6"
                >Reporting</a
              >
              <span class="text-light fw-semibold d-block"
                >Report signals from your community</span
              >
            </div>
            <!--end::Title-->

            <span
              class="fw-bold text-warning py-1"
              style="font-size: 17px !important"
            >
              <i class="fas fa-circle-notch fa-2x text-light fw-bold"></i>
            </span>
          </div>
          <!--end::Item-->
        </router-link>

        <router-link to="/CebsTriage" v-if="isAllowedRole">
          <div
            class="d-flex shadow-lg align-items-center bg-dark rounded p-5 mb-7"
          >
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg-->
            <span class="svg-icon svg-icon-warning svg-icon-1 me-5">
              <i class="fas text-light fw-bolder fa-user-md"></i>
            </span>
            <!--end::Svg Icon-->
            <!--begin::Title-->
            <div class="flex-grow-1 me-2">
              <a href="#" class="fw-bold text-light text-hover-primary fs-6"
                >Triage</a
              >
              <span class="text-light fw-semibold d-block"
                >Triage signals assigned to you</span
              >
            </div>
            <!--end::Title-->

            <span
              class="fw-bold text-warning py-1"
              style="font-size: 17px !important"
            >
              <i class="fas fa-circle-notch fa-2x text-dark fw-bold"></i>
            </span>
          </div>
        </router-link>

        <router-link to="/CebsVerify" v-if="isAllowedRole">
          <div
            class="d-flex shadow-lg align-items-center bg-dark rounded p-5 mb-7 unique-class-4"
          >
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg-->
            <span class="svg-icon svg-icon-warning svg-icon-1 me-5">
              <i class="fas text-light fw-bolder fa-check-circle"></i>
            </span>
            <!--end::Svg Icon-->
            <!--begin::Title-->
            <div class="flex-grow-1 me-2">
              <a href="#" class="fw-bold text-light text-hover-primary fs-6"
                >Signal Verification</a
              >
              <span class="text-light fw-semibold d-block"
                >Verify signals assigned to you</span
              >
            </div>
            <!--end::Title-->

            <span
              class="fw-bold text-warning py-1"
              style="font-size: 17px !important"
            >
              <i class="fas fa-circle-notch fa-2x text-light fw-bold"></i>
            </span>
          </div>
        </router-link>

        <router-link to="/Ra" v-if="isAllowedRiskAssessment">
    <div class="d-flex shadow-lg unique-class-5 align-items-center bg-danger rounded p-5 mb-7">
      <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg-->
      <span class="svg-icon svg-icon-warning svg-icon-1 me-5">
        <i class="fas text-light fw-bolder fa-file-alt"></i>
      </span>
      <!--end::Svg Icon-->
      <!--begin::Title-->
      <div class="flex-grow-1 me-2">
        <a href="#" class="fw-bold text-light text-hover-primary fs-6">Risk Assessment and Response</a>
        <span class="text-light fw-semibold d-block">RA and Response Management</span>
      </div>
      <!--end::Title-->

      <span class="fw-bold text-warning py-1" style="font-size: 17px !important">
        <i class="fas fa-circle-notch fa-2x text-light fw-bold"></i>
      </span>
    </div>
         </router-link>
      
      </div>
      <!--end::Body-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    window.SetMyPageTitle("Select CEBS Action");

    // this.Verify();
    // this.Response();
    // this.Escalation();
  },
  methods: {
    Verify() {},
    // Response() {
    //   // Find the element with the unique class
    //   // const uniqueElement = document.querySelector(".unique-class-5");

    //   // Add click event listener
     
    // },

    // Escalation() {
    //   // Find the element with the unique class
    //   const uniqueElement = document.querySelector(".unique-class-6");

    //   // Add click event listener
    //   uniqueElement.addEventListener("click", () => {
    //     // Trigger Swal.fire with the appropriate message
    //     Swal.fire(
    //       "Account Not Assigned",
    //       "This account is not assigned to handle escalation actions.",
    //       "info"
    //     );
    //   });
    // },
  },
  computed: {
    isAllowedRole() {
      const allowedRoles = [
        "Triaging",
        "Verification and Triaging",
        "Triaging and Verification",
        "Verification",
      ];
      const currentRole = sessionStorage.getItem("CurrentLoggedInUserRole");
      return allowedRoles.includes(currentRole);
    },
  },
  isAllowedRiskAssessment() {
    // Define the allowed terms
    const allowedTerms = [
      "Facilitate Risk Assessment",
      "Risk Assessment",
      "Conduct Risk Assessment",
      "Assessment",
    ];

    // Get the current role from sessionStorage
    const currentRoles = sessionStorage.getItem("CurrentLoggedInUserRole");

    // Create a regular expression that matches any of the allowed terms (case insensitive)
    const regex = new RegExp(allowedTerms.join("|"), "i");

    // Check if the current role matches the regular expression
    return regex.test(currentRoles);
  },
};
</script>
