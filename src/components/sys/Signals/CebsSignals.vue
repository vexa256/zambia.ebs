<template>
    <div>
        <div class="card-body mb-3 pb-3 pe-2 bg-light  table-responsive container-fluid">
            <router-link to="/ViewCebsSignals">
                <button type="button" class="btn btn-sm float-end mt-3 btn-danger ms-2">
                    <i class="fas fa-eye"></i> View CEBS Signals
                </button>

            </router-link>
        </div>
        <div class="card-body px-5 py-5 bg-light shadow-lg table-responsive">
            <form method="POST" id="AddSignalCategory" enctype="multipart/form-data">
                <div class="wiz-element">
                    <div class="fv-row mb-10">
                        <!--begin::Label-->
                        <label class="required fw-semibold fs-6 mb-2">Signal Display Picture</label> <!--end::Label-->
                        <!--begin::Input-->
                        <input class="form-control" name="DisplayPicture" type="file" placeholder="Upload Image"
                            accept="image/*">

                        <!--end::Input-->
                    </div>
                </div>
                <div id="MgtEBSSignals"></div>
                <SelectSignalCategory />
                <input type="text" name="PostRoute" value="MassInsert" class="d-none" />
                <input type="text" name="TableName" value="ebs_signals" class="d-none" />
                <input type="text" name="created_at" value="" class="d-none" />
                <input type="text" name="EbsType" value="CEBS" class="d-none" />
                <input type="text" name="SignalID" class="randomid d-none" />


            </form>
        </div>


        <!-- Modal -->

    </div>
</template>
  
<script>
import axios from "axios";
import Select2 from "select2";
import SelectSignalCategory from './SelectSignalCategory.vue';

export default {
    components: {
        SelectSignalCategory,
    },
    data() {
        return {
            searchTerm: "",
            provinces: [],
            EbsSignalCategoryID: null,
            tableName: "ebs_signals",
            excludedColumns: ["created_at", "updated_at", "EbsSignalCategoryID", 'EbsType', 'SignalID', , 'DisplayPicture', 'ReportID'],
            records: [],
            titleColumnName: "EbsSignalCategory",
            ignoredColumns: ["created_at", "updated_at", "EbsSignalCategoryID", 'EbsType', 'SignalID', 'DisplayPicture', 'ReportID'],
            SERVER_URL: window.SERVER_URL,
        };
    },
    mounted() {
        window.fixSelectInModals();
        window.RemoveDisplayElements(this.ignoredColumns);

        window.SetMyPageTitle("Create and Manage CEBS signals");

        window.ButtonActions(".DeleteMe", "Delete", () =>
            this.fetchAndDisplayData()
        );
        window.FormEngine(
            this.tableName,
            this.excludedColumns,
            "#MgtEBSSignals",
            12,
            12
        );
        setRandomId();
        setCreatedAtValue();
        SendFormEngine("AddSignalCategory", () => this.fetchAndDisplayData());
        SendFormEngine("ThisUpdateData", () => this.fetchAndDisplayData());
        window.removeElementsWithXIdClass();
        // this.FetchProvinces();
    },
    async created() {
        await this.fetchAndDisplayData();
    },
    methods: {
        updateRecord(id, tableName) {
            // Call your update function with the id and tableName
            // I am not sure about the other parameters, but you can replace them with the correct values
            window.UpdateEngine(
                tableName,
                this.excludedColumns,
                "#UpdateModalContent",
                12,
                12,
                id
            );

            this.fetchAndDisplayData();

            window.setElementValueWhenAvailable(".UpdateRecordID", id);
        },

        // Update the form

        formatColumnName(name) {
            return name
                .replace(/([A-Z])/g, " $1")
                .replace(/_/g, " ")
                .trim();
        },
        async fetchAndDisplayData() {
            try {
                const {
                    data: { records },
                } = await axios.post(`${this.SERVER_URL}FetchEbsSignals`, {
                    excludedColumns: this.excludedColumns,
                });

                if (!Array.isArray(records) || records.length === 0)
                    throw "Invalid or empty records";

                this.records = records;
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        },
    },
    computed: {
        filteredRecords() {
            if (!this.searchTerm) {
                return this.records;
            }

            const normalizedSearchTerm = this.searchTerm.toLowerCase();
            return this.records.filter((record) => {
                const title = record[this.titleColumnName]?.toLowerCase();
                return title.includes(normalizedSearchTerm);
            });
        },
    },
};
</script>
  