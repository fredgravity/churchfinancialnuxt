<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add assembly</div>
    </div>

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
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
          <button type="button" class="btn btn-primary" @click="submitAssembly">Add Assembly</button>
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
const areas = ref([]);
const districts = ref([]);
const filteredDistricts = ref([]);

const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});

const assembly = reactive({
  name: "",
  area_id: "",
  district: "",
  pastor: "",
  openedOn: "",
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
});

const getDistrict = async (e) => {
  let res = districts.value.filter((res) => {
    let data = res.attributes.area_id.toString() == assembly.area_id;
    return data;
  });

  filteredDistricts.value = res;
  console.log(filteredDistricts.value);
};

let submitAssembly = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/assembly", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: assembly,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Church Assembly not added successfully!. Try again";
    show.title = "Add Assembly";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    // alert();
    show.state = "show";
    show.message_type = "";
    show.message = "Church Assembly added successfully!";
    show.title = "Add Assembly";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    assembly.name = "";
    assembly.area_id = "";
    assembly.district = "";
    assembly.pastor = "";
    assembly.openedOn = "";
    assembly.status = "";
  }
};
</script>

<style></style>
