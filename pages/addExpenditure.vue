<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">add expenditure</div>

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Budget Item</label>
          <div class="col-md-10">
            <select class="form-control" id="ministry" v-model="expenditure.budget_item_id" @change="getBudgetItems($event)">
              <template v-for="(budget, index) in budgetItems.value" :key="index">
                <option v-if="budget.attributes.name" :value="budget.id">{{ budget.attributes.name }} - {{ budget.attributes.year }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="year" class="col-md-2 col-form-label">Year</label>
          <div class="col-md-10">
            <input class="form-control" type="number" id="year" v-model="expenditure.year" disabled />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="type" class="col-md-2 col-form-label">Type</label>
          <div class="col-md-10">
            <select class="form-control" id="type" v-model="expenditure.type" disabled>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="amount" class="col-md-2 col-form-label">Amount</label>
          <div class="col-md-10">
            <input class="form-control" type="number" id="amount" v-model="expenditure.amount" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="requestedBy" class="col-md-2 col-form-label">Requested By</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="requestedBy" v-model="expenditure.requestedBy" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="approvedBy" class="col-md-2 col-form-label">Approved By</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="approvedBy" v-model="expenditure.approvedBy" />
          </div>
        </div>

        <div class="mb-3 row">
          <div>
            <label for="details" class="form-label">Details</label>
            <textarea class="form-control" id="details" rows="3" v-model="expenditure.details"></textarea>
          </div>
        </div>

        <div class="">
          <div class="nav-align-top mb-4">
            <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
              <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#pills-assembly" aria-controls="navs-pills-justified-home" aria-selected="true"><i class=""></i> Assembly</button>
              </li>
              <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#pills-district" aria-controls="navs-pills-justified-profile" aria-selected="false">District</button>
              </li>
              <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#pills-area" aria-controls="navs-pills-justified-messages" aria-selected="false">Area</button>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="pills-assembly" role="tabpanel">
                <div class="">
                  <select class="form-control" id="assembly" v-model="expenditure.assembly">
                    <template v-for="(assembly, index) in assemblies.value" :key="index">
                      <option v-if="assembly.attributes.name" :value="assembly.attributes.name">{{ assembly.attributes.name }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="tab-pane fade" id="pills-district" role="tabpanel">
                <div class="">
                  <select class="form-control" id="district" v-model="expenditure.district">
                    <template v-for="(district, index) in districts.value" :key="index">
                      <option v-if="district.attributes.name" :value="district.attributes.name">{{ district.attributes.name }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="tab-pane fade" id="pills-area" role="tabpanel">
                <div class="">
                  <select class="form-control" id="area" v-model="expenditure.area">
                    <template v-for="(area, index) in areas.value" :key="index">
                      <option v-if="area.attributes.name" :value="area.attributes.name">{{ area.attributes.name }}</option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mb-3">
          <button type="button" class="btn btn-primary" @click="submitExpenditure">Add Expenditure</button>
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
const assemblies = reactive([]);
const districts = reactive([]);
const areas = reactive([]);
const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});
const expenditure = reactive({
  budget_item_id: "",
  year: "",
  amount: "",
  type: "",
  approvedBy: "",
  requestedBy: "",
  assembly: "",
  district: "",
  area: "",
  details: "",
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
  const { data, error, refresh } = await useFetch(api_base + "/assembly", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  assemblies.value = data.value.data;
  console.log(assemblies.value);
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/district", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  districts.value = data.value.data;
  console.log(districts.value);
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/area", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  areas.value = data.value.data;
  console.log(areas.value);
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

  let Items = data.value.data;

  let arry = [];
  Items.filter((res) => {
    if (res.attributes.type === "expense") {
      console.log(res.attributes.type);
      arry.push(res);
    }
  });
  budgetItems.value = arry;
  // console.log(arry);
});

const getBudgetItems = async (event) => {
  let result = budgetItems.value.filter((res) => {
    return res.id == event.target.value;
  });
  console.log(result[0].attributes);

  expenditure.year = result[0].attributes.year;
  expenditure.type = result[0].attributes.type;
};

let submitExpenditure = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/expenditure", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: expenditure,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Expenditure not added successfully!. Try again";
    show.title = "Add Expenditure";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    show.state = "show";
    show.message_type = "";
    show.message = "Expenditure added successfully!";
    show.title = "Add Expenditure";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    expenditure.budget_item_id = "";
    expenditure.year = "";
    expenditure.amount = "";
    expenditure.type = "";
    expenditure.approvedBy = "";
    expenditure.requestedBy = "";
    expenditure.assembly = "";
    expenditure.district = "";
    expenditure.area = "";
    expenditure.details = "";
  }
};
</script>

<style></style>
