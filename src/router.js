// router.js
import { createRouter, createWebHashHistory } from "vue-router";
import { nextTick } from 'vue'

import MgtProvinces from "./components/sys/Structures/MgtProvinces.vue";
import MgtDistricts from "./components/sys/Structures/MgtDistricts.vue";
import MgtConstituencies from "./components/sys/Structures/MgtConstituencies.vue";
import MgtWards from "./components/sys/Structures/MgtWards.vue";
import MgtVillages from "./components/sys/Structures/MgtVillages.vue";
import MgtChvGroups from "./components/sys/Structures/MgtChvGroups.vue";
import MgtHealthFacilities from "./components/sys/Facilities/MgtHealthFacilities.vue";
import MgtVetFacilities from "./components/sys/Facilities/MgtVetFacilities.vue";
import MgtEnvFacilities from "./components/sys/Facilities/MgtEnvFacilities.vue";
import StructureCebs from "./components/sys/EbsStructures/StructureCebs.vue";
import Designations from "./components/sys/EbsStructures/Designations.vue";
import StructureFhebs from "./components/sys/EbsStructures/StructureFhebs.vue";
import StructureVebs from "./components/sys/EbsStructures/StructureVebs.vue";
import StructureMebs from "./components/sys/EbsStructures/StructureMebs.vue";
import StructureHotline from "./components/sys/EbsStructures/StructureHotline.vue";
import StructuresEebs from "./components/sys/EbsStructures/StructuresEebs.vue";
import SignalCategories from "./components/sys/Signals/SignalCategories.vue";
import CebsSignals from "./components/sys/Signals/CebsSignals.vue";
import HfebsSignals from "./components/sys/Signals/HfebsSignals.vue";
import ViewCebsSignals from "./components/sys/Signals/ViewCebsSignals.vue";
import ViewHfebsSignals from "./components/sys/Signals/ViewHfebsSignals.vue";
import ViewMebsSignals from "./components/sys/Signals/ViewMebsSignals.vue";
import ViewEebsSignals from "./components/sys/Signals/ViewEebsSignals.vue";
import MebsSignals from "./components/sys/Signals/MebsSignals.vue";
import EebsSignals from "./components/sys/Signals/EebsSignals.vue";
// import EebsSignals from "./components/sys/Signals/EebsSignals.vue";
import HotlineSignals from "./components/sys/Signals/HotlineSignals.vue";
import ViewHotline from "./components/sys/Signals/ViewHotline.vue";
import CebsSelectOps from "./components/sys/EbsOps/CebsSelectOps.vue";
import EbsReportSignals from "./components/sys/EbsOps/EbsReportSignals.vue";
import CebsTriage from "./components/sys/EbsOps/CebsTriage.vue";
import CebsVerify from "./components/sys/EbsOps/CebsVerify.vue";
import CebsVerifylogic from "./components/sys/EbsOps/CebsVerifylogic.vue";
// import CebsVerifylogic from "./components/sys/EbsOps/CebsVerifylogic.vue";
import ViewVerifyReport from "./components/sys/EbsOps/ViewVerifyReport.vue";
import Ra from "./components/sys/EbsOps/Ra.vue";
import RaLogic from "./components/sys/EbsOps/RaLogic.vue";
import ReportingByDistrict from "./components/sys/CebsRep/ReportingByDistrict.vue";
import TimeAnalytics from "./components/sys/CebsRep/TimeAnalytics.vue";
import RaAnalytics from "./components/sys/CebsRep/RaAnalytics.vue";
import ReportedVsVerified from "./components/sys/CebsRep/ReportedVsVerified.vue";
import ReportedVsDiscarded from "./components/sys/CebsRep/ReportedVsDiscarded.vue";
import ReportedVsUnverified from "./components/sys/CebsRep/ReportedVsUnverified.vue";
import DataReport from "./components/sys/CebsRep/DataReport.vue";
import Logout from "./components/sys/Auth/Logout.vue";
// import HfebsSignals from "./components/sys/Signals/HfebsSignals.vue";
// import Page2 from "./components/Page2.vue";
// import other page components...

const routes = [
  { path: "/MgtProvinces", component: MgtProvinces },
  { path: "/MgtDistricts", component: MgtDistricts },
  { path: "/MgtConstituencies", component: MgtConstituencies },
  { path: "/MgtWards", component: MgtWards },
  { path: "/MgtVillages", component: MgtVillages },
  { path: "/MgtChvGroups", component: MgtChvGroups },
  { path: "/MgtHealthFacilities", component: MgtHealthFacilities },
  { path: "/MgtVetFacilities", component: MgtVetFacilities },
  { path: "/MgtEnvFacilities", component: MgtEnvFacilities },
  { path: "/StructureCebs", component: StructureCebs },
  { path: "/Designations", component: Designations },
  { path: "/StructureFhebs", component: StructureFhebs },
  { path: "/StructureVebs", component: StructureVebs },
  { path: "/StructureMebs", component: StructureMebs },
  { path: "/StructureHotline", component: StructureHotline },
  { path: "/StructuresEebs", component: StructuresEebs },
  { path: "/CebsSignals", component: CebsSignals },
  { path: "/HfebsSignals", component: HfebsSignals },
  { path: "/SignalCategories", component: SignalCategories },
  { path: "/ViewCebsSignals", component: ViewCebsSignals },
  { path: "/ViewHfebsSignals", component: ViewHfebsSignals },
  { path: "/ViewHfebsSignals", component: ViewHfebsSignals },
  { path: "/ViewMebsSignals", component: ViewMebsSignals },
  { path: "/MebsSignals", component: MebsSignals },
  { path: "/EebsSignals", component: EebsSignals },
  { path: "/ViewEebsSignals", component: ViewEebsSignals },
  { path: "/HotlineSignals", component: HotlineSignals },
  { path: "/ViewHotline", component: ViewHotline },
  { path: "/CebsSelectOps", component: CebsSelectOps },
  { path: "/EbsReportSignals", component: EbsReportSignals },
  { path: "/", component: CebsSelectOps },
  { path: "/CebsTriage", component: CebsTriage },
  { path: "/CebsVerify", component: CebsVerify },
  { path: "/CebsVerifylogic", component: CebsVerifylogic },
  { path: "/ViewVerifyReport", component: ViewVerifyReport },
  { path: "/Ra", component: Ra },
  { path: "/RaLogic", component: RaLogic },
  { path: "/ReportingByDistrict", component: ReportingByDistrict },
  { path: "/TimeAnalytics", component: TimeAnalytics },
  { path: "/RaAnalytics", component: RaAnalytics },
  { path: "/ReportedVsVerified", component: ReportedVsVerified },
  { path: "/ReportedVsDiscarded", component: ReportedVsDiscarded },
  { path: "/ReportedVsUnverified", component: ReportedVsUnverified },
  { path: "/DataReport", component: DataReport },
  { path: "/Logout", component: Logout },
  // { path: "/HfebsSignals", component: HfebsSignals },
  //   { path: "/page2", component: Page2 },
  // add more routes...
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



router.afterEach((to, from) => {
  if (to.path !== from.path) {
    const lastReloadTime = localStorage.getItem('lastReloadTime');
    const currentTime = Date.now();
    
    if (!lastReloadTime || currentTime - lastReloadTime > 60000) { // 5000 ms = 5 sec
      localStorage.setItem('lastReloadTime', currentTime.toString());
      window.location.reload();
    }
  }
});


export default router;
