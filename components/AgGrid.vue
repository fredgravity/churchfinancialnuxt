<template>
  <div>
    <div class="text-xs w-full mb-2">
      Page Size:
      <select @change="onPageSizeChanged" id="page-size" class="h-7 w-15 text-xs outline-none rounded-md border-blue-500 px-3 py-0">
        <option value="5" selected="">5</option>
        <option value="10" selected="">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <ag-grid-vue
      style="width: 100%; height: 75vh"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      animateRows="true"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      @cell-clicked="cellWasClicked"
      @cellValueChanged="valueChanged"
      :pagination="true"
      :paginationPageSize="paginationPageSize"
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
const paginationPageSize = ref(10);

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

const onPageSizeChanged = (event) => {
  // console.log(event.target.value);
  paginationPageSize.value = event.target.value;
};

// console.log(props.results);

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  enableCellChangeFlash: true,
  resizable: true,
  editable: true,
  sortable: true,
};
</script>
