<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">add budget</div>

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Budget Item</label>
          <div class="col-md-10">
            <select class="form-control" id="ministry" v-model="budget.budget_item_id" @change="getBudgetItems($event)">
              <template v-for="(budget, index) in budgetItems.value" :key="index">
                <option v-if="budget.attributes.name" :value="budget.id">{{ budget.attributes.name }} - {{ budget.attributes.year }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="year" class="col-md-2 col-form-label">Year</label>
          <div class="col-md-10">
            <input class="form-control" type="number" id="email" v-model="budget.year" disabled />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="type" class="col-md-2 col-form-label">Type</label>
          <div class="col-md-10">
            <select class="form-control" id="type" v-model="budget.type" disabled>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Ministry</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="email" v-model="budget.ministry" disabled />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="amount" class="col-md-2 col-form-label">Amount</label>
          <div class="col-md-10">
            <input class="form-control" type="number" id="email" v-model="budget.amount" />
          </div>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitBudget">Add Budget</button>
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
const budgetItems = reactive([]);
const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});
const budget = reactive({
  budget_item_id: "",
  year: "",
  amount: "",
  type: "",
  ministry: "",
});

const error_message = ref("");

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

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/budget-item", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  budgetItems.value = data.value.data;
});

const getBudgetItems = async (event) => {
  let result = budgetItems.value.filter((res) => {
    return res.id == event.target.value;
  });
  console.log(result[0].attributes.name);
  budget.year = result[0].attributes.year;
  budget.type = result[0].attributes.type;
  budget.ministry = result[0].attributes.ministry_name;
};

let submitBudget = async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/budget", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: budget,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Budget not added successfully!. Try again";
    show.title = "Add Budget";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    show.state = "show";
    show.message_type = "";
    show.message = "Budget added successfully!";
    show.title = "Add Budget";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    budget.year = "";
    budget.type = "";
    budget.amount = "";
    budget.ministry = "";
    budget.budget_item_id = "";
  }
};
</script>

<style></style>
