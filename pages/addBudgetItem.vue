<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">add budget item</div>

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="name" class="col-md-2 col-form-label">Budget Item Name</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="name" v-model="budgetItem.name" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="year" class="col-md-2 col-form-label">Year</label>
          <div class="col-md-10">
            <input class="form-control" type="number" id="email" v-model="budgetItem.year" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="type" class="col-md-2 col-form-label">Type</label>
          <div class="col-md-10">
            <select class="form-control" id="type" v-model="budgetItem.type">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Ministry</label>
          <div class="col-md-10">
            <select class="form-control" id="ministry" v-model="budgetItem.ministry_id">
              <template v-for="(ministry, index) in ministries.value" :key="index">
                <option v-if="ministry.attributes.name" :value="ministry.id">{{ ministry.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitBudgetItem">Add Budget Item</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const ministries = reactive([]);
const budgetItem = reactive({
  name: "",
  year: "",
  type: "",
  ministry_id: "",
});

const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/ministry", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  ministries.value = data.value.data;
  console.log(ministries.value);
});

let submitBudgetItem = async () => {
  console.log("hi");
  const { data, error, refresh } = await useFetch(api_base + "/budget-item", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: budgetItem,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Budget Item not added successfully!. Try again";
    show.title = "Add Budget Item";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  }
  if (data.value.data) {
    show.state = "show";
    show.message_type = "";
    show.message = "Budget Item added successfully!";
    show.title = "Add Budget Item";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    budgetItem.name = "";
    budgetItem.year = "";
    budgetItem.type = "";
    budgetItem.ministry_id = "";
  }
};
</script>

<style></style>
