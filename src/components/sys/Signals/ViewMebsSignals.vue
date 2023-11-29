<template>
    <div>
        <div class="card-body mb-3 pb-3 pe-2 bg-light  table-responsive container-fluid">
            <router-link to="/HfebsSignals">
                <button type="button" class="btn btn-sm float-end mt-2 mb-3 btn-danger ms-2">
                    <i class="fas fa-arrow-left"></i>
                    Back
                </button>

            </router-link>
        </div>
        <div class="card mt-5 mb-5 futuristic-card" v-for="(record, index) in records" :key="record.id">
            <div class="card shadow-sm">
                <div class="text-center px-4 py-2">
                    <img class="mw-100 mh-300px card-rounded-top" :src="this.ASSET_URL + record.DisplayPicture"
                        alt="Record Image" @click="showImage(this.ASSET_URL + record.DisplayPicture)" />
                </div>
                <div class="card-body p-5">
                    <h3 class="card-title">{{ record.EbsSignal }}</h3>
                    <div class="card-body text-danger fw-bolder">Signal #{{ record.SignalNumber }}</div>
                </div>
                <div class="card-footer p-5 m-5 d-flex justify-content-between">
                    <button class="btn btn-sm btn-dark" type="button" id="updateButton" data-bs-toggle="modal"
                        data-bs-target="#UpdateProvincesModal" :data-id="record.id" :data-tablename="tableName"
                        @click="updateRecord(record.id, tableName)">
                        <i class="bi bi-pencil-fill"></i> Update
                    </button>
                    <button class="btn btn-sm btn-danger DeleteMe" type="button" :data-id="record.id"
                        :data-tablename="tableName">
                        <i class="bi bi-trash-fill"></i> Delete
                    </button>
                </div>

            </div>
        </div>

        <teleport to="body">
            <div v-if="lightbox.show" class="lightbox">
                <div class="lightbox-content">
                    <img :src="lightbox.image" alt="" @click="closeImage()">
                </div>
            </div>
        </teleport>

        <!-- Update Modal -->

        <div class="modal fade" id="UpdateProvincesModal" tabindex="-1" role="dialog" aria-labelledby="modalTitleId"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitleId">
                            Update the selected record
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="#" id="ThisUpdateData">
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="wiz-element">
                                    <div class="fv-row mb-10">
                                        <!--begin::Label-->
                                        <label class="required fw-semibold fs-6 mb-2">Signal Display Picture</label>
                                        <!--end::Label-->
                                        <!--begin::Input-->
                                        <input class="form-control" name="DisplayPicture" type="file"
                                            placeholder="Upload Image" accept="image/*">

                                        <!--end::Input-->
                                    </div>
                                </div>
                                <div id="UpdateProvinceForm">
                                    <input type="text" name="PostRoute" value="MassUpdate" class="d-none" />
                                    <input type="text" name="TableName" value="ebs_signals" class="d-none" />
                                    <input type="text" class="UpdateRecordID d-none" name="id" value="" />
                                    <div id="UpdateModalContent"></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button data-bs-dismiss="modal" type="submit" class="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Update Modal -->
    </div>
</template>




<script>
import axios from 'axios';

export default {
    data() {
        return {
            records: [],
            ASSET_URL: window.ASSET_URL,
            tableName: "ebs_signals",
            titleColumnName: "EbsSignalCategory",
            ignoredColumns: ["created_at", "updated_at", "EbsSignalCategoryID", 'EbsType', 'SignalID', 'DisplayPicture'],

            lightbox: {
                show: false,
                image: ''
            }
        };
    },
    created() {
        this.fetchRecords();
    },
    mounted() {
        window.SetMyPageTitle("View HFEBS Signals");
        window.ButtonActions(".DeleteMe", "Delete", () => this.fetchRecords()); // Changed to fetchRecords as fetchAndDisplayData doesn't exist

        window.RemoveDisplayElements(this.ignoredColumns);
        window.removeElementsWithXIdClass();


        SendFormEngine("ThisUpdateData", () => this.fetchRecords());

    },
    methods: {
        showImage(image) {
            this.lightbox.image = image;
            this.lightbox.show = true;
        },

        closeImage() {
            this.lightbox.show = false;
            this.lightbox.image = '';
        },
        async fetchRecords() {
            try {
                const response = await axios.get(SERVER_URL + 'FetchMEBsSignals');
                this.records = response.data.records;
            } catch (error) {
                console.error(error);
            }
        },
        updateRecord(id, tableName) {
            // Call your update function with the id and tableName
            // I am not sure about the other parameters, but you can replace them with the correct values
            window.UpdateEngine(
                tableName,
                this.ignoredColumns,
                "#UpdateModalContent",
                12,
                12,
                id
            );

            this.fetchRecords();  // Changed to fetchRecords as fetchAndDisplayData doesn't exist

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