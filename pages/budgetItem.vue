<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">budget item</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="budgetItems" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const budgetItems = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Item", field: "name" },
  { headerName: "Year", field: "year" },
  { headerName: "Type", field: "type" },
  { headerName: "Ministry", field: "ministry_name" },
  // { headerName: "Status", field: "status" },
  // { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
]);

const recordClick = (event) => {
  console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh, pending } = await useFetch(api_base + "/budget-item", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  budgetItems.value = data.value.data;
  console.log(budgetItems.value);
  rowData.value = budgetItems.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      year: res.attributes.year,
      type: res.attributes.type,
      ministry_name: res.attributes.ministry_name,
      ministry_id: res.attributes.ministry_id,
      // openedOn: res.attributes.openedOn,
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
