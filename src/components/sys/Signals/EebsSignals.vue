<template>
    <div>
        <div class="card-body mb-3 pb-3 pe-2 bg-light  table-responsive container-fluid">
            <router-link to="/ViewEebsSignals">
                <button type="button" class="btn btn-sm float-end mt-3 btn-danger ms-2">
                    <i class="fas fa-eye"></i> View EEBS Signals
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
                <input type="text" name="EbsType" value="EEBS" class="d-none" />
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
            excludedColumns: ["created_at", "updated_at", "EbsSignalCategoryID", 'EbsType', 'SignalID', , 'DisplayPicture'],
            records: [],
            titleColumnName: "EbsSignalCategory",
            ignoredColumns: ["created_at", "updated_at", "EbsSignalCategoryID", 'EbsType', 'SignalID', 'DisplayPicture'],
            SERVER_URL: window.SERVER_URL,
        };
    },
    mounted() {
        window.fixSelectInModals();
        window.RemoveDisplayElements(this.ignoredColumns);

        window.SetMyPageTitle("Create and Manage EEBS signals");


        window.FormEngine(
            this.tableName,
            this.excludedColumns,
            "#MgtEBSSignals",
            12,
            12
        );
        setRandomId();
        setCreatedAtValue();
        SendFormEngine("AddSignalCategory")
        SendFormEngine("ThisUpdateData")
        window.removeElementsWithXIdClass();
        // this.FetchProvinces();
    },

    methods: {
        updateRecord(id, tableName) {




        },

        // Update the form

        formatColumnName(name) {
            return name
                .replace(/([A-Z])/g, " $1")
                .replace(/_/g, " ")
                .trim();
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
  