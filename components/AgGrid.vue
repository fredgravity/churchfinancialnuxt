<template>
  <div>
    <ag-grid-vue
      style="width: 100%; height: 70vh"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      animateRows="true"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      @cell-clicked="cellWasClicked"
      @cellValueChanged="valueChanged"
      :paginationAutoPageSize="true"
      :pagination="true"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
const gridApi = ref({});
const columnApi = ref({});

const props = defineProps({ results: Object, columnDefs: Object, rowData: Object });

const emit = defineEmits(["recordClick"]);

const onGridReady = (params) => {
  gridApi.value = params.api;
  columnApi.value = params.columnApi;
};

const cellWasClicked = (event) => {
  // console.log("cell was clicked", event.data);
  emit("recordClick", event);
};

const valueChanged = (event) => {
  //   console.log("cell was edited", event);
};

// console.log(props.results);

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
};
</script>
