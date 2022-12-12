<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">edit assembly</div>
    </div>

    <Loading :loading="loading" />

    <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
      {{ error_message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <form class="md:w-2/3 mx-auto">
      <div class="mb-3 row">
        <label for="name" class="col-md-2 col-form-label">Assembly Name</label>
        <div class="col-md-10">
          <input class="form-control" type="text" id="name" v-model="assembly.name" />
        </div>
      </div>

      <div class="mb-3 row">
        <label for="pastor" class="col-md-2 col-form-label">Name of Pastor</label>
        <div class="col-md-10">
          <input class="form-control" type="text" id="pastor" v-model="assembly.pastor" />
        </div>
      </div>

      <div class="mb-3 row">
        <label for="openedOn" class="col-md-2 col-form-label">Opened Date</label>
        <div class="col-md-10">
          <input class="form-control" type="date" id="openedOn" v-model="assembly.openedOn" />
        </div>
      </div>

      <div class="mb-3 row">
        <label for="status" class="col-md-2 col-form-label">Status</label>
        <div class="col-md-10">
          <select class="form-control" id="area" v-model="assembly.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="mb-3 row">
        <label for="area" class="col-md-2 col-form-label">Area</label>
        <div class="col-md-10">
          <select class="form-control" id="area" v-model="assembly.area_id" @change="getDistrict($event)">
            <template v-for="(area, index) in areas" :key="index">
              <option v-if="area.attributes.name" :value="parseInt(area.id)">{{ area.attributes.name }}</option>
            </template>
          </select>
        </div>
      </div>

      <div class="mb-3 row">
        <label for="district" class="col-md-2 col-form-label">District</label>
        <div class="col-md-10">
          <select class="form-control" id="district" v-model="assembly.district">
            <template v-for="(district, index) in filteredDistricts" :key="index">
              <option v-if="district.attributes" :value="district.attributes.name">{{ district.attributes.name }}</option>
            </template>
          </select>
        </div>
      </div>

      <div class="text-center">
        <button type="button" class="btn btn-primary" @click="submitAssembly">Update Assembly</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const assembly_id = ref("");
const areas = ref("");
const districts = ref("");
const filteredDistricts = ref([]);
const route = useRoute();
const error_message = ref("");
const loading = ref("");

const assembly = reactive({
  name: "",
  area_id: "",
  status: "",
  openedOn: "",
  district: "",
  pastor: "",
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
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/district/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  districts.value = data.value.data;
});

const getDistrict = async (e) => {
  let res = districts.value.filter((res) => {
    let data = res.attributes.area_id.toString() == assembly.area_id;
    return data;
  });

  filteredDistricts.value = res;
};

onMounted(async () => {
  assembly_id.value = route.params.id;
  console.log(assembly_id.value);

  const { data, error, refresh, pending } = await useFetch(api_base + "/assembly/" + assembly_id.value, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  loading.value = pending.value;

  let result = data.value.data;
  assembly.name = result.attributes.name;
  assembly.area_id = result.attributes.area_id;
  assembly.status = result.attributes.status;
  assembly.openedOn = result.attributes.openedOn;
  assembly.district = result.attributes.district;
  assembly.pastor = result.attributes.pastor;
});

let submitAssembly = async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/assembly/" + assembly_id.value, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: assembly,
    initialCache: false,
  });

  loading.value = pending.value;

  if (error.value) {
    error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    // alert();
    error_message.value = "Church Assembly updated successfully!";
  }
};
</script>

<style></style>
