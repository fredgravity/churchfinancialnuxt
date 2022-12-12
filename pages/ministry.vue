<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">member</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="ministries" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const ministries = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([{ headerName: "Name", field: "name" }]);

const recordClick = (event) => {
  window.location.href = "/editMinistry-" + event.data.id;
};

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh, pending } = await useFetch(api_base + "/ministry", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  ministries.value = data.value.data;
  rowData.value = ministries.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
