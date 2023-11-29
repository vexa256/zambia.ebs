<template>
  <div id="LoginPage">
    <!--begin::Theme mode setup on page load-->
    <!--begin::Root-->
    <div class="d-flex flex-column flex-root" id="kt_app_root">
      <!--begin::Authentication - Sign-in -->
      <div class="d-flex flex-column flex-lg-row flex-column-fluid">
        <!--begin::Body-->
        <div
          class="d-flex flex-column flex-lg-row-fluid w-lg-100 p-10 order-2 order-lg-1"
        >
          <!--begin::Form-->
          <div class="d-flex flex-center flex-column flex-lg-row-fluid">
            <!--begin::Wrapper-->
            <div class="w-lg-500px p-10">

                <svg width="78" height="56" viewBox="0 0 78 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M61.1141 2.77686L76.3225 50.1304C77.1517 52.7123 75.2258 55.3535 72.5141 55.3535H61.3308C59.588 55.3535 58.0457 54.2251 57.5183 52.5641L42.4827 5.21052C41.6637 2.63121 43.5889 0 46.2951 0H57.3057C59.0436 0 60.5826 1.12219 61.1141 2.77686Z" fill="#EF305E"/>
  <g filter="url(#filter0_i_10691_7143)">
  <path d="M46.5484 37.8L35.8243 3.44919C35.1837 1.39729 33.2837 0 31.1341 0C28.5177 0 26.3602 2.05036 26.227 4.66341L24.9187 30.3392C24.8722 31.2511 24.9822 32.1643 25.2439 33.0391L31.0655 52.4999C31.5721 54.1934 33.1302 55.3535 34.8977 55.3535H40.3093C42.0503 55.3535 43.5914 54.2274 44.1203 52.5686L46.5266 45.0214C47.2752 42.6736 47.2828 40.1523 46.5484 37.8Z" fill="white"/>
  <path d="M46.5484 37.8L35.8243 3.44919C35.1837 1.39729 33.2837 0 31.1341 0C28.5177 0 26.3602 2.05036 26.227 4.66341L24.9187 30.3392C24.8722 31.2511 24.9822 32.1643 25.2439 33.0391L31.0655 52.4999C31.5721 54.1934 33.1302 55.3535 34.8977 55.3535H40.3093C42.0503 55.3535 43.5914 54.2274 44.1203 52.5686L46.5266 45.0214C47.2752 42.6736 47.2828 40.1523 46.5484 37.8Z" fill="url(#paint0_linear_10691_7143)"/>
  </g>
  <path d="M20.317 0H31.3316C34.0288 0 35.9529 2.61489 35.1505 5.18995L20.2695 52.9475C19.7487 54.619 18.2014 55.7576 16.4506 55.7576H5.43606C2.73888 55.7576 0.814784 53.1427 1.61716 50.5676L16.4981 2.81005C17.019 1.13856 18.5663 0 20.317 0Z" fill="#EF305E"/>
  <defs>
  <filter id="filter0_i_10691_7143" x="24.9083" y="0" width="22.1854" height="55.3535" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="-4" dy="3"/>
  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0.904167 0 0 0 0 0.892865 0 0 0 0 0.892865 0 0 0 0.4 0"/>
  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_10691_7143"/>
  </filter>
  <linearGradient id="paint0_linear_10691_7143" x1="29" y1="24.5" x2="40.5" y2="27.5" gradientUnits="userSpaceOnUse">
  <stop stop-opacity="0.25"/>
  <stop offset="0.911458" stop-color="white" stop-opacity="0"/>
  </linearGradient>
    </defs>
    </svg> 


              <!--begin::Form-->
              <div class="w-lg-500px p-10">
                <!--begin::Form-->
                <form
                  class="form-container form w-100"
                  id="kt_sign_in_form"
                  @submit.prevent="handleSubmit"
                >
                  <!--begin::Heading-->
                  <div class="text-center mb-11">
                    <!--begin::Title-->
                    <h1 class="text-dark fw-bolder mb-3">Zambia Digital EBS</h1>
                    <!--end::Title-->
                    <!--begin::Subtitle-->
                    <div class="text-gray-500 fw-semibold fs-6">Sign In</div>
                    <!--end::Subtitle=-->
                  </div>
                  <!--begin::Heading-->
                  <!--begin::Input group=-->
                  <div class="fv-row mb-8">
                    <!--begin::Email-->
                    <input
                      type="text"
                      placeholder="Phone Number"
                      v-model="PhoneNumber"
                      class="form-control bg-transparent"
                      autocomplete
                    />
                    <!--end::Email-->
                  </div>
                  <!--end::Input group=-->
                  <div class="fv-row mb-3">
                    <!--begin::Password-->
                    <input
                      type="password"
                      placeholder="Password"
                      v-model="password"
                      class="form-control bg-transparent"
                      autocomplete
                    />
                    <!--end::Password-->
                  </div>
                  <!--end::Input group=-->
                  <!--begin::Submit button-->
                  <div class="d-grid mb-10">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      class="btn btn-primary shadow-lg"
                    >
                      <!--begin::Indicator label-->
                      <span class="indicator-label">Sign In</span>
                      <!--end::Indicator label-->
                      <!--begin::Indicator progress-->
                      <span class="indicator-progress"
                        >Please wait...
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        ></span>
                      </span>
                      <!--end::Indicator progress-->
                    </button>
                  </div>
                  <!--end::Submit button-->
                  <!--begin::Sign up-->

                  <!--end::Sign up-->
                  <!-- ... rest of the form ... -->
                </form>
                <!--end::Form-->
              </div>
              <!--end::Form-->
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Form-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::Authentication - Sign-in-->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      PhoneNumber: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["setAuthToken"]), // map Vuex action
    handleSubmit() {
      if (!this.PhoneNumber || !this.password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You missed one of the form inputs!",
        });
      } else {
        axios
          .post(window.SERVER_URL + "AuthenticateUser", {
            PhoneNumber: this.PhoneNumber,
            password: this.password,
          })
          .then((response) => {
            if (response.status === 200) {
              // Check if any key is null (exclude timestamp and email verification keys)

            
              const user = response.data.user;
              const keysToExclude = [
                "created_at",
                "updated_at",
                "email_verified_at",
                "ProvinceID",
                "WardID",
              ];
              let invalidKeys = [];
              for (let key in user) {
                if (!keysToExclude.includes(key) && user[key] === null) {
                  // Convert the key to human readable form and add to the list
                  let readableKey = key.replace(/([A-Z])/g, " $1").trim(); // converts "WardName" to "Ward Name"
                  invalidKeys.push(readableKey);
                }
              }
              if (invalidKeys.length > 0) {
                Swal.fire(
                  "Error!",
                  `Invalid user data received! Missing fields: ${invalidKeys.join(
                    ", "
                  )}`,
                  "error"
                );
              } else {
                // Dispatch the Vuex action
                this.setAuthToken(response.data.user);


              
                sessionStorage.setItem(
                  "AuthToken",
                  JSON.stringify(response.data.user)
                );

                console.log(sessionStorage.getItem("AuthToken"));

                const sessionData = JSON.parse(
                  sessionStorage.getItem("AuthToken")
                )[0];
                const UserID = sessionData ? sessionData.UserID : null;

                sessionStorage.setItem("UserID", UserID);

                console.log('UserID '+sessionStorage.getItem('UserID'));

                window.CurrentUserID = sessionStorage.getItem('UserID');

                Swal.fire("Success!", "User authenticated!", "success");









    // Get the AuthToken item
    let authItem = sessionStorage.getItem("AuthToken");

    // Check if the item exists
    if (authItem !== null) {
        // Parse the item as JSON
        let authObj = JSON.parse(authItem);

        // Check if the first object in the array has a role property
        if (authObj[0] && authObj[0].hasOwnProperty('Role')) {
            // Save the role in the sessionStorage under the key CurrentLoggedInUserRole
            sessionStorage.setItem("CurrentLoggedInUserRole", authObj[0].Role);
            console.log('Role is set to: ', authObj[0].Role);
        } else {
            console.log('No role found in AuthToken.');
        }
    } else {
        console.log('AuthToken not found in sessionStorage.');
    }















              }
            }
          })
          .catch((error) => {
            Swal.fire("Error!", "Authentication failed!", "error");
          });
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  width: 100%;
  max-width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  width: 70%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-container {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.form-control,
.btn-primary {
  width: 100%;
  /* ... other styles ... */
}

@media (max-width: 767.98px) {
  .form-container {
    width: 100%;
    max-width: none;
  }
}

.w-lg-500px {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-center {
  text-align: center;
}

@media (max-width: 767.98px) {
  .w-lg-500px {
    width: 100%;
    max-width: none;
  }

  .form-control,
  .btn-primary {
    width: 100%;
    max-width: none;
  }
}
</style>
