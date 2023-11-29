<template>
  <div>
        <MenuBlock v-for="(block, index) in filteredMenuBlocks" :key="index" :title="block.title" :iconClass="block.iconClass"
          :submenuClass="block.submenuClass" :menuItems="block.menuItems" />
  </div>
</template>

<script>
import MenuBlock from "./MenuBlock.vue";
import Swal from "sweetalert2";

export default {
  name: "Sidebar",
  components: {
    MenuBlock,
  },
  data() {
    return {
      menuBlocks: [
        {
          title: "Country Structures",
          iconClass: "fas fa-flag-checkered fa-3x",
          submenuClass: "ADMNISTRATIVEUNITS",
          menuItems: [
            {
              label: "Provinces",
              className: "mt-2 mb-2",
              link: "/MgtProvinces",
            },
            {
              label: "Districts",
              className: "mt-2 mb-2",
              link: "/MgtDistricts",
            },
            {
              label: "Constituencies",
              className: "mt-2 mb-2",
              link: "/MgtConstituencies",
            },
            { label: "Wards", className: "mt-2 mb-2", link: "/MgtWards" },
            { label: "Villages", className: "mt-2 mb-2", link: "/MgtVillages" },
            {
              label: "CHV Groups",
              className: "mt-2 mb-2",
              link: "/MgtChvGroups",
            },
          ],
        },
        {
          title: "Country Facilities",
          iconClass: "fas fa-hospital fa-3x",
          submenuClass: "ADMNISTRATIVEUNITS",
          menuItems: [
            {
              label: "Health Facilities",
              className: "mt-2 mb-2",
              link: "/MgtHealthFacilities",
            },
            {
              label: "VET Facilities",
              className: "mt-2 mb-2",
              link: "/MgtVetFacilities",
            },
            {
              label: "Environmental Facilities",
              className: "mt-2 mb-2",
              link: "/MgtEnvFacilities",
            },
          ],
        },

        {
          title: "EBS  Structures",
          iconClass: "fas fa-project-diagram fa-3x",
          submenuClass: "ADMNISTRATIVEUNITS",
          menuItems: [
            {
              label: "Designations",
              className: "mt-2 mb-2",
              link: "/Designations",
            },

            {
              label: "CEBS Structures",
              className: "mt-2 mb-2",
              link: "/StructureCebs",
            },
          ],
        },

        {
          title: "Set EBS  Signals",
          iconClass: "fas fa-signal fa-3x",
          submenuClass: "ADMNISTRATIVEUNITS",
          menuItems: [
            {
              label: "Signal Categories",
              className: "mt-2 mb-2",
              link: "/SignalCategories",
            },
            {
              label: "CEBS Signals",
              className: "mt-2 mb-2",
              link: "/CebsSignals",
            },
          ],
        },
        {
          title: "EBS Operations",
          iconClass: "fas fa-cogs fa-3x",
          submenuClass: "ADMNISTRATIVEUNITS",
          menuItems: [
            {
              label: "CEBS",
              className: "mt-2 mb-2",
              link: "/CebsSelectOps",
            },
            {
              label: "Logout",
              className: "mt-2 mb-2",
              link: "/Logout",
            },
          ],
        },
        {
          title: "CEBS Reports",
          iconClass: "fas fa-chart-line fa-3x",
          submenuClass: "",
          menuItems: [
            {
              label: "Reporting By District",
              className: "mt-2 mb-2",
              link: "/ReportingByDistrict",
            },
            {
              label: "Time Analytics",
              className: "mt-2 mb-2",
              link: "/TimeAnalytics",
            },
            {
              label: "Risk Assessment Analytics",
              className: "mt-2 mb-2",
              link: "/RaAnalytics",
            },
            {
              label: "Reported Vs Verified",
              className: "mt-2 mb-2",
              link: "/ReportedVsVerified",
            },
            {
              label: "Reported Vs Discarded",
              className: "mt-2 mb-2",
              link: "/ReportedVsDiscarded",
            },
            {
              label: "Reported Vs Unverified",
              className: "mt-2 mb-2",
              link: "/ReportedVsUnverified",
            },

            {
              label: "System Data Report",
              className: "mt-2 mb-2",
              link: "/DataReport",
            },
          ],
        },
        {
          title: "User Account",
          iconClass: "fas fa-user-cog fa-3x",
          submenuClass: "SUPERADMINPREV",
          menuItems: [
            {
              label: "Logout",
              className: "mt-2 mb-2",
              link: "/Logout",
            },
            {
              label: "Training Mode",
              className: "mt-2 mb-2",
              link: "#",
            },
          ],
        },

        // other blocks...
      ],
    };
  },
  computed: {
    filteredMenuBlocks() {
      const checkRole = "nationalleveloversight";

      const currentRole = sessionStorage.getItem("CurrentLoggedInUserRole");
      const normalizedRole = currentRole ? currentRole.replace(/\s+/g, '').toLowerCase() : '';

      console.log("Normalized Role: " + normalizedRole);


      if (normalizedRole === checkRole) {
        return this.menuBlocks;
      } else {
        return this.menuBlocks.filter(block => block.title === "EBS Operations");
      }
    },
  },
  mounted() {
    // your code...
  },
  methods: {
    // your code...
  },
};
</script>
