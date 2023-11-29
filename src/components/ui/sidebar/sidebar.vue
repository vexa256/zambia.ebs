<template>
  <div>
    <!--begin::Sidebar-->
    <div
      style="z-index: 4000;"
      class="app-sidebar flex-column"
      data-kt-drawer="true"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-direction="start"
      data-kt-drawer-name="app-sidebar"
      data-kt-drawer-overlay="true"
      data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
      data-kt-drawer-width="225px"
      id="kt_app_sidebar"
    >
      <SidebarLogo />
      <!--begin::sidebar menu-->
      <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
        <!--begin::Menu wrapper-->
        <div
          class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
          data-kt-scroll-height="auto"
          data-kt-scroll-offset="5px"
          data-kt-scroll-save-state="true"
          data-kt-scroll-wrappers="#kt_app_sidebar_menu"
          id="kt_app_sidebar_menu_wrapper"
        >
          <!--begin::Menu-->
          <div
            class="menu menu-column menu-rounded menu-sub-indention px-3"
            data-kt-menu="true"
            data-kt-menu-expand="false"
            id="#kt_app_sidebar_menu"
          >
            <!--end:Menu item-->
            <!--begin:Menu item-->
            <!-- SidebarLinks -->

            <SidebarLinks />
            <!-- SidebarLinks -->
          </div>
          <!--end::Menu-->
        </div>
        <!--end::Menu wrapper-->
      </div>
      <!--end::sidebar menu-->
      <!--begin::Footer-->
      <SidebarFooter />
      <!--end::Footer-->
    </div>
    <!--end::Sidebar-->
  </div>
</template>

<script>
import SidebarFooter from "./SidebarFooter.vue";
import SidebarLogo from "./SidebarLogo.vue";
import SidebarLinks from "./SidebarLinks.vue";
export default {
  name: "Sidebar",
  components: {
    SidebarFooter,
    SidebarLogo,
    SidebarLinks,
  },
  data() {
    return {
      // example data, replace this with your actual menu data
    };
  },
};
</script>
