<script setup>
import Header from "./components/ui/header/header.vue";
import Sidebar from "./components/ui/sidebar/sidebar.vue";
import Toolbar from "./components/ui/toolbar/toolbar.vue";
import Footer from "./components/ui/footer/footer.vue";
import Auth from "../src/components/sys/Auth/Login.vue";
</script>

<template>
  <div>
    <Auth v-if="!isAppRootVisible" />

   <div class="WholeApp" v-show="isAppRootVisible">
    <div class="d-flex flex-column flex-root app-root" id="kt_app_root" >
      <!--begin::Page-->
      <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
        <!--begin::Header-->
        <Header />
        <!--end::Header-->
        <!--begin::Wrapper-->
        <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
          <!--begin::Sidebar-->
          <Sidebar />
          <!--end::Sidebar-->
          <!--begin::Main-->
          <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
            <!--begin::Content wrapper-->
            <div class="d-flex flex-column flex-column-fluid">
              <!--begin::Toolbar-->
              <Toolbar />
              <!--end::Toolbar-->
              <!--begin::Content-->
              <div class="app-content flex-column-fluid" id="kt_app_content" style="height: 90%; overflow-y: scroll;">
                <!--begin::Content container-->
                <div 
                  class="app-container container-fluid"
                  id="kt_app_content_container"
                  
                >
                  <!--  DIV FOR SCRN ROUTER -->
                  <div id="MYCONTENT" >
                    <router-view></router-view>
                  </div>
                  <!--  DIV FOR SCRN ROUTER -->
                </div>
                <!--end::Content container-->
              </div>
              <!--end::Content-->
            </div>
            <!--end::Content wrapper-->
            <!--begin::Footer-->
            <Footer />
            <!--end::Footer-->
          </div>
          <!--end::Main-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Page-->
    </div>
   </div>
  </div>
</template>

<style scoped>

#MYCONTENT {
  height: 100%;
  overflow-y: auto;
}

html,
body,
#app,
.WholeApp,
.app-root,
.app-page,
.app-wrapper,
.app-main,
.d-flex {
  height: 100%;
}

</style>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAppRootVisible'])
  },
  mounted() {
  
},

  watch: {
    isAppRootVisible(newValue, oldValue) {
      console.log(`isAppRootVisible changed from ${oldValue} to ${newValue}`);
    },
  },
  
}
</script>

<style scoped>
.app-root {
    display: none;
}

.app-root[style*="display: block"] {
    display: flex !important;
}
</style>