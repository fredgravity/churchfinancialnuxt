<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">Tithe</div>
    <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
      {{ error_message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="mb-3 row">
      <label for="assembly" class="col-md-2 col-form-label">Find Assembly</label>
      <div class="col-md-10">
        <select class="form-control" id="assembly" @change="getAssemblyDetails($event)">
          <option selected disabled>Find an assembly to pay tithe</option>
          <template v-for="(assembly, index) in assemblies.value" :key="index">
            <option :value="assembly.id">{{ assembly.attributes.name }}</option>
          </template>
        </select>
      </div>
    </div>
    <div>
      <div class="col-md">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img class="card-img card-img-left" src="~/assets/img/elements/12.jpg" alt="Card image" />
            </div>
            <div class="col-md-8">
              <div class="card-body" v-if="detail.attributes">
                <p class="card-title font-semibold">
                  Assembly: <span class="text-gray-400 text-lg">{{ detail.attributes.name }}</span>
                </p>
                <p class="card-text font-semibold">
                  District: <span class="text-gray-400">{{ detail.attributes.district }}</span>
                </p>
                <p class="card-text font-semibold">
                  Area: <span class="text-gray-400">{{ detail.attributes.area }}</span>
                </p>
                <p class="card-text font-semibold">
                  Head Pastor: <span class="text-gray-400">{{ detail.attributes.pastor }}</span>
                </p>
                <p class="card-text font-semibold">
                  <small class="text-muted">Last updated {{ new Date(detail.attributes.updated_at).toDateString() }}</small>
                </p>
              </div>
              <div class="text-center mb-3 md:mb-0" v-if="detail.attributes">
                <div class="mb-3">
                  <label for="name" class="col-md-2 col-form-label">Enter Amount</label>
                  <div class="col-md-7 mx-auto">
                    <input class="form-control" type="number" id="name" v-model="tithe.amount" />
                  </div>
                </div>
                <button type="button" class="btn btn-success" @click="submitTithe">Pay Tithe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive text-nowrap h-42">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date Paid</th>
            <!-- <th>Date of Birth</th>
            <th>email</th>
            <th>Phone</th> -->
          </tr>
        </thead>
        <tbody class="table-border-bottom-0" v-if="detail.attributes">
          <template v-for="(tithe, index) in detail.attributes.tithe" :key="index">
            <tr>
              <td>
                <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>GHS {{ tithe.amount }}</strong>
              </td>
              <td>{{ new Date(tithe.updated_at).toDateString() }}</td>
              <!-- <td>sdfsdf</td>
            <td>
              <span class="badge bg-label-primary me-1">fdsfs</span>
            </td>
            <td>kjlkl</td> -->
              <td>
                <div class="dropdown">
                  <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" :href="'/member'"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                    <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const assemblies = reactive([]);
const error_message = ref("");
const detail = ref("");
const assembly_id = ref("");
const tithe = reactive({
  amount: "",
  assembly_id: assembly_id,
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
});

const getAssemblyDetails = async (e) => {
  assembly_id.value = e.target.value;
  const { data, error, refresh } = await useFetch(api_base + "/assembly/" + assembly_id.value, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });
  detail.value = data.value.data;
};

const submitTithe = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/tithe", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: tithe,
    initialCache: false,
  });
  console.log(data.value.data);
  if (data.value.data) {
    error_message.value = "Tithe paid added successfully!";
    tithe.amount = "";
  }
};
</script>

<style></style>
