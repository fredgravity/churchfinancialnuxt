<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">income</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="incomes" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const incomes = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Item", field: "income_name" },
  { headerName: "Year", field: "year" },
  { headerName: "Amount", field: "amount" },
  { headerName: "Area", field: "area" },
  { headerName: "District", field: "district" },
  { headerName: "Assembly", field: "assembly" },
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

  const { data, error, refresh, pending } = await useFetch(api_base + "/income", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  incomes.value = data.value.data;
  console.log(incomes.value);
  rowData.value = incomes.value.map((res) => {
    let mine = {
      income_name: res.attributes.budget_item_name,
      year: res.attributes.year,
      amount: res.attributes.amount,
      area: res.attributes.area,
      district: res.attributes.district,
      assembly: res.attributes.assembly,
      budget_item_id: res.attributes.budget_item_id,
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
