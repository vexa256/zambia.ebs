<template>
 
    <div class="wiz-element col-md-12 my-3 py-3">
        <label id="label" for="" class="required form-label my-1 py-1">Select Signal Category</label>
        <select id="" class="form-select SignalCategoriesSelect form-control form-select-light"
            data-placeholder="Select an option" name="EbsSignalCategoryID">
            <option value="">Select an option</option>

        </select>
    </div>
</template>
    
<script>
export default {
    data() {
        return {

        };
    },
    mounted() {
        window.ClassBasedFetchSelect(
            "SignalCategoriesSelect",
            "FetchEbsSignalCategory",
            "EbsSignalCategory",
            "EbsSignalCategoryID"
        );
    }

};
</script>
    