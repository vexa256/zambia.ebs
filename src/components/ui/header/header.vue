<template>
  <div class="app-header sticky-top" id="kt_app_header">
    <!--begin::Header container-->
    <div
      class="app-container container-fluid d-flex align-items-stretch justify-content-between"
      id="kt_app_header_container"
    >
      <!--begin::Sidebar mobile toggle-->
      <div
        class="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2"
        title="Show sidebar menu"
      >
        <div
          class="btn btn-icon btn-active-color-primary w-35px h-35px"
          id="kt_app_sidebar_mobile_toggle"
        >
          <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.png-->
          <span class="svg-icon svg-icon-2 svg-icon-md-1">
            <svg fill="none" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor"></path>
<path d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" opacity="0.3"></path>
</svg>
          </span>
          <!--end::Svg Icon-->
        </div>
      </div>
      <!--end::Sidebar mobile toggle-->
      <!--begin::Mobile logo-->
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <a class="d-lg-none" href="#">
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

        </a>
      </div>
      <!--end::Mobile logo-->
      <!--begin::Header wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
        id="kt_app_header_wrapper"
      >
        <!--begin::Menu wrapper-->
        <div
          class="app-header-menu app-header-mobile-drawer align-items-stretch"
          data-kt-drawer="true"
          data-kt-drawer-activate="{default: true, lg: false}"
          data-kt-drawer-direction="end"
          data-kt-drawer-name="app-header-menu"
          data-kt-drawer-overlay="true"
          data-kt-drawer-toggle="#kt_app_header_menu_toggle"
          data-kt-drawer-width="250px"
          data-kt-swapper="true"
          data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
          data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
        >
          <!--begin::Menu-->
          <div
            class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
            data-kt-menu="true"
            id="kt_app_header_menu"
          >
            <!--begin:Menu item-->
          </div>
          <!--end::Menu-->
        </div>
        <!--end::Menu wrapper-->
        <!--begin::Navbar-->
        <div class="app-navbar flex-shrink-0">
          <!--begin::Search-->

          <!--end::Search-->

          <!--end::My apps links-->
          <!--begin::Theme mode-->
          <div class="app-navbar-item ms-1 ms-md-3">
            <!--begin::Menu toggle-->
            <a
              class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
              href="#"
            >
              <!--begin::Svg Icon | path: icons/duotune/general/gen060.png-->
              <span class="svg-icon theme-light-show svg-icon-2">
                <img src="../../../assets/svgsl/svg_55.svg" />
              </span>
              <!--end::Svg Icon-->
              <!--begin::Svg Icon | path: icons/duotune/general/gen061.png-->
              <span class="svg-icon theme-dark-show svg-icon-2">
                <img src="../../../assets/svgsl/svg_56.svg" />
              </span>
              <!--end::Svg Icon-->
            </a>
            <!--begin::Menu toggle-->
            <!--begin::Menu-->
            <div
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px"
              data-kt-element="theme-mode-menu"
              data-kt-menu="true"
            >
              <!--begin::Menu item-->
              <div class="menu-item px-3 my-0">
                <a
                  class="menu-link px-3 py-2"
                  data-kt-element="mode"
                  data-kt-value="light"
                  href="#"
                >
                  <span class="menu-icon" data-kt-element="icon">
                    <!--begin::Svg Icon | path: icons/duotune/general/gen060.png-->
                    <span class="svg-icon svg-icon-3">
                      <img src="../../../assets/svgsl/svg_57.svg" />
                    </span>
                    <!--end::Svg Icon-->
                  </span>
                  <span class="menu-title">
                    Light
                  </span>
                </a>
              </div>
              <!--end::Menu item-->
              <!--begin::Menu item-->
              <div class="menu-item px-3 my-0">
                <a
                  class="menu-link px-3 py-2"
                  data-kt-element="mode"
                  data-kt-value="dark"
                  href="#"
                >
                  <span class="menu-icon" data-kt-element="icon">
                    <!--begin::Svg Icon | path: icons/duotune/general/gen061.png-->
                    <span class="svg-icon svg-icon-3">
                      <img src="../../../assets/svgsl/svg_58.svg" />
                    </span>
                    <!--end::Svg Icon-->
                  </span>
                  <span class="menu-title">
                    Dark
                  </span>
                </a>
              </div>
              <!--end::Menu item-->
              <!--begin::Menu item-->
              <div class="menu-item px-3 my-0">
                <a
                  class="menu-link px-3 py-2"
                  data-kt-element="mode"
                  data-kt-value="system"
                  href="#"
                >
                  <span class="menu-icon" data-kt-element="icon">
                    <!--begin::Svg Icon | path: icons/duotune/general/gen062.png-->
                    <span class="svg-icon svg-icon-3">
                      <img src="../../../assets/svgsl/svg_59.svg" />
                    </span>
                    <!--end::Svg Icon-->
                  </span>
                  <span class="menu-title">
                    System
                  </span>
                </a>
              </div>
              <!--end::Menu item-->
            </div>
            <!--end::Menu-->
          </div>
          <!--end::Theme mode-->

          <!--begin::Header menu toggle-->

          <!--end::Header menu toggle-->
        </div>
        <!--end::Navbar-->
      </div>
      <!--end::Header wrapper-->
    </div>
    <!--end::Header container-->
  </div>
</template>
