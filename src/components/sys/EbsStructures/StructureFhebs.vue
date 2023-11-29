<template>
    <div>
        <div class="card-body mb-3 pb-3 pe-2 bg-light  table-responsive container-fluid">
            <button type="button" data-bs-toggle="modal" data-bs-target="#ViewData"
                class="btn btn-sm float-end mt-3 btn-danger ms-2">
                <i class="fas fa-eye"></i> View HFEBS Structures
            </button>
        </div>
        <div class="card-body px-5 py-5 bg-light shadow-lg table-responsive">
            <form method="POST" id="AddHF">
                <Roles />
                <SelectLevels />
                <SelectFacilities />
                <SelectDesignations />
                <div id="MgtRoles"></div>
                <input type="text" name="PostRoute" value="CreateEBsStructure" class="d-none" />
                <input type="text" name="TableName" value="ebs_structures" class="d-none" />
                <input type="text" name="created_at" value="" class="d-none" />
                <input type="text" value="HFEBS" name="EbsType" class=" d-none" />
                <input type="text" value="" name="UserID" class="randomid d-none" />
                <input type="text" name="RoleID" class="randomid d-none" />
            </form>
        </div>
        <div class="modal fade" id="ViewData" aria-labelledby="ViewDataLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header shadow-lg">
                        <div class="col-12">
                            <input type="text" class="form-control float-end mt-4" v-model="searchTerm"
                                placeholder="Search HFEBS Structures" />
                        </div>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div>
                                <div>
                                    <div class="list-group shadow-lg" id="accordionExample">
                                        <div class="list-group-item" v-for="(record, index) in filteredRecords"
                                            :key="index">
                                            <div class="d-flex justify-content-between align-items-center"
                                                data-bs-toggle="collapse" :data-bs-target="'#collapse' + index"
                                                :aria-expanded="index == 0" :aria-controls="'collapse' + index">
                                                <h5 class="mb-1 text-danger fw-bolder">
                                                    <i class="me-2 fas fa-circle-notch text-danger me-2"></i>
                                                    {{ record[titleColumnName] }}
                                                </h5>
                                                <button class="btn btn-link text-secondary" type="button">
                                                    <i class="fas fa-chevron-down"></i>
                                                </button>
                                            </div>
                                            <div :id="'collapse' + index" class="collapse" :class="{ show: index == 0 }"
                                                data-bs-parent="#accordionExample">
                                                <div class="card mt-2">
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item" v-for="(value, key) in record"
                                                            :key="key" v-if="!ignoredColumns.includes(key)"
                                                            :class="`x_${key}`">
                                                            <div class="d-flex justify-content-between py-3"
                                                                :class="`x_${key}`">
                                                                <strong>{{ formatColumnName(key) }}</strong>
                                                                <span class="fw-bold text-primary">{{
                                                                    value
                                                                }}</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="card-body text-center">
                                                        <button type="button" class="btn btn-dark btn-sm me-2"
                                                            data-bs-toggle="modal" data-bs-target="#UpdateProvincesModal"
                                                            :data-id="record.id" :data-tablename="tableName"
                                                            @click="updateRecord(record.id, tableName)">
                                                            <i class="fas fa-edit"></i> Update
                                                        </button>
                                                        <button type="button" class="btn btn-danger DeleteMe btn-sm"
                                                            :data-id="record.id" :data-tablename="tableName">
                                                            <i class="fas fa-trash"></i> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

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
                    <form action="#" id="UpdateFormData">
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div id="UpdateProvinceForm">


                                    <!-- form data -->

                                    <Roles />
                                    <SelectLevels />
                                    <SelectFacilities />
                                    <SelectDesignations />



                                    <input type="text" name="PostRoute" value="UpdateEBsStructure" class="d-none" />
                                    <input type="text" name="TableName" value="ebs_structures" class="d-none" />
                                    <input type="text" class="UpdateRecordID d-none" name="id" value="" />
                                    <!-- <input type="text" name="created_at" value="" class="d-none" />
            <input type="text" value="HFEBS" name="EbsType" class=" d-none" />
            <input type="text" value="" name="UserID" class="randomid d-none" />
            <input type="text" name="RoleID" class="randomid d-none" /> -->



                                    <!-- form data -->
                                    <div id="UpdateModalContent"></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import Roles from './Roles.vue';
import SelectLevels from './SelectLevels.vue';
import SelectFacilities from './SelectFacilities.vue';
import SelectDesignations from './SelectDesignations.vue';


export default {
    components: {
        Roles,
        SelectLevels,
        SelectFacilities,
        SelectDesignations,
    },
    data() {
        return {
            provinces: [],
            provinceId: null,
            searchTerm: "",
            tableName: "ebs_structures",
            excludedColumns: [
                "created_at",
                "updated_at",
                "Role",
                "RoleID",
                "EbsType",
                "EbsType",
                "OfficialDesignation",
                "AdministrativeLevel",
                "EscalatesToRoleID",
                "FacilityID",
                "ReportsToLevel",
                "ChvGroupID",
                "UserID",

            ],
            records: [],
            titleColumnName: "Name",
            ignoredColumns: [
                "created_at",
                "updated_at",
                "Role",
                "RoleID",
                "EbsType",
                "EbsType",
                "OfficialDesignation",
                "AdministrativeLevel",
                "EscalatesToRoleID",
                "FacilityID",
                "ReportsToLevel",
                "ChvGroupID",
                "UserID",

            ],
            SERVER_URL: window.SERVER_URL,
        };
    },
    mounted() {
        window.RemoveDisplayElements(this.ignoredColumns);
        window.fixSelectInModals();
        window.SetMyPageTitle("Manage HFEBS Workflow Structure");

        window.ButtonActions(".DeleteMe", "Delete", () =>
            this.fetchAndDisplayData()
        );

        setRandomId();
        setCreatedAtValue();
        SendFormEngine("AddHF", () => this.fetchAndDisplayData());
        SendFormEngine("UpdateFormData", () => this.fetchAndDisplayData());
        window.removeElementsWithXIdClass();

        window.ClassBasedFetchSelect(
            "ward-select",
            "FetchWards",
            "WardName",
            "WardID"
        );

        window.PopulateHealthFacilities();
        window.FormEngine(this.tableName, this.excludedColumns, "#MgtRoles", 12, 12);

        // window.FetchSelect(
        //   "ward-select-update",
        //   "FetchVillages",
        //   "VillageName",
        //   "VillageID"
        // );
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
                } = await axios.get(`${this.SERVER_URL}FetchCebsStructures`);

                if (!Array.isArray(records) || records.length === 0)
                    throw "Invalid or empty records";
                console.log(records);
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
    