<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">tithe</div>
    <Loading :loading="loading" />
    <AgGrid :results="tithes" :columnDefs="columnDefs" :rowData="rowData" />
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const tithes = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Assembly", field: "name" },
  { headerName: "Area", field: "area" },
  { headerName: "District", field: "district" },
  { headerName: "Pastor", field: "pastor" },
  { headerName: "Status", field: "status" },
  { headerName: "OpenedOn", field: "openedOn" },
  { headerName: "Total Tithe", field: "total" },
]);

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/assembly", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });
  loading.value = pending.value;
  tithes.value = data.value.data;
  rowData.value = tithes.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      area: res.attributes.area.name,
      district: res.attributes.district,
      pastor: res.attributes.pastor,
      status: res.attributes.status,
      openedOn: res.attributes.openedOn,
      total: res.attributes.tithe.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0),
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
