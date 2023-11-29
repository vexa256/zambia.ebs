<template>
  <div>
    <div class="card-body mb-3 pb-3 pe-2 bg-light table-responsive container-fluid" >
      <router-link to="/CebsSelectOps">
        <button
          type="button"
          class="btn btn-sm float-end mt-2 mb-3 btn-danger ms-2"
        >
          <i class="fas fa-arrow-left"></i>
          Back
        </button>
      </router-link>

      <button
        type="button"
        class="btn btn-sm float-end mt-2 mb-3 btn-dark ms-2"
        data-bs-toggle="modal"
        data-bs-target="#ViewData"
      >
        <i class="fas fa-eye"></i>
        Your Signals
      </button>
    </div>
    <div
      class="card mt-5 mb-5 futuristic-card"
      v-for="(record, index) in records"
      :key="record.id"
    >
      <div class="card shadow-sm">
        <div class="text-center px-4 py-2">
          <img
            class="mw-100 mh-300px card-rounded-top"
            :src="this.ASSET_URL + record.DisplayPicture"
            alt="Record Image"
            @click="showImage(this.ASSET_URL + record.DisplayPicture)"
          />
        </div>
        <div class="card-body p-5">
          <h3 class="card-title">{{ record.EbsSignal }}</h3>
          <div class="card-body text-danger fw-bolder">
            Signal #{{ record.SignalNumber }}
          </div>
        </div>
        <div class="card-footer p-5 m-5 d-flex justify-content-between">
          <button
            class="btn btn-sm btn-danger"
            type="button"
            id="updateButton"
            :data-id="record.id"
            :data-tablename="tableName"
            @click="ReportSignal(record.id, tableName)"
          >
            <i class="fas fa-check"></i> Report Signal
          </button>
        </div>
      </div>
    </div>

    <teleport to="body">
      <div v-if="lightbox.show" class="lightbox">
        <div class="lightbox-content">
          <img :src="lightbox.image" alt="" @click="closeImage()" />
        </div>
      </div>
    </teleport>
    <MyReportedSignals />
  
  </div>
</template>


<script>
import axios from "axios";
import MyReportedSignals from "./MyReportedSignals.vue";

export default {
  components: {
    MyReportedSignals,
       
    },


  data() {
    return {
      records: [],
      signals: [],
      SERVER_URL: window.SERVER_URL,
      ASSET_URL: window.ASSET_URL,
      tableName: "ebs_signals",
      titleColumnName: "EbsSignalCategory",
      ignoredColumns: [
        "created_at",
        "updated_at",
        "EbsSignalCategoryID",
        "EbsType",
        "SignalID",
        "DisplayPicture",
      ],

      lightbox: {
        show: false,
        image: "",
      },
    };
  },
  created() {
    this.fetchRecords();
  },
  mounted() {
    // console.log(sessionStorage.getItem("AuthToken"));
    window.SetMyPageTitle("View CEBS Signals");
    window.ButtonActions(".DeleteMe", "Delete", () => this.fetchRecords()); // Changed to fetchRecords as fetchAndDisplayData doesn't exist

    window.RemoveDisplayElements(this.ignoredColumns);
    window.removeElementsWithXIdClass();

    SendFormEngine("ThisUpdateData", () => this.fetchAndDisplayData());
  },
  methods: {

    showImage(image) {
      this.lightbox.image = image;
      this.lightbox.show = true;
    },

    closeImage() {
      this.lightbox.show = false;
      this.lightbox.image = "";
    },
    async fetchRecords() {
      try {
        const response = await axios.get(this.SERVER_URL + "FetchEbsSignals");
        this.records = response.data.records;
      } catch (error) {
        console.error(error);
      }
    },   
  
  
    ReportSignal(id, tableName) {
      window.reportEBsSignal(id);

    //  this.fetchAndDisplayData();
      
     
    
      window.setElementValueWhenAvailable(".UpdateRecordID", id);
    },
  },

};
</script>

<style scoped>
.lightbox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
}

.lightbox-content img {
  width: 100%;
  height: auto;
  cursor: pointer;
}

.card-footer {
  padding: 10px 15px;
}

.futuristic-card {
  margin: 1rem;
  transition: all 0.3s ease;
}

.futuristic-card:hover {
  transform: scale(1.05);
}

.card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

.card-header {
  background: transparent;
  border: none;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  color: #333333;
  font-weight: 700;
  font-size: 1.3rem;
}

.btn-outline-secondary,
.btn-outline-danger {
  border-color: #333333;
  color: #333333;
  border-radius: 50px;
}

.btn-outline-secondary:hover,
.btn-outline-danger:hover {
  background: #333333;
  color: #ffffff;
}

.card-body {
  background: #ffffff;
  color: #333333;
  padding: 1rem;
}

.card-p {
  padding: 0.5rem 0;
  font-size: 0.875rem;
}

.mw-100 {
  width: 100%;
  object-fit: cover;
}

.mh-300px {
  height: 70vh;
}

.card-rounded-top {
  border-radius: 20px 20px 0 0;
}

@media only screen and (max-width: 600px) {
  .card-title {
    font-size: 1.1rem;
  }

  .card-p {
    font-size: 0.75rem;
  }

  .mh-300px {
    height: 50vh;
  }
}
</style>
