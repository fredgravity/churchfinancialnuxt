<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">training item</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="trainingItems" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const trainingItems = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Training", field: "name" },
  { headerName: "Start Date", field: "startDate" },
  { headerName: "End Date", field: "endDate" },
  { headerName: "Venue", field: "venue" },
  { headerName: "Organised By", field: "ministry_name" },
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

  const { data, error, refresh, pending } = await useFetch(api_base + "/training-item", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  trainingItems.value = data.value.data;
  rowData.value = trainingItems.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      venue: res.attributes.venue,
      startDate: res.attributes.startDate,
      endDate: res.attributes.endDate,
      ministry_name: res.attributes.ministry_name,
      ministry_id: res.attributes.ministry_id,
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
