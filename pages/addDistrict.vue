<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add district</div>
    </div>
    <Loading :loading="loading" />
    <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
      {{ error_message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="district" class="col-md-2 col-form-label">District</label>
          <div class="col-md-10">
            <select class="form-control" id="district" v-model="district.area_id">
              <template v-for="(area, index) in areas.value" :key="index">
                <option :value="area.id">{{ area.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="name" class="col-md-2 col-form-label">District Name</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="name" v-model="district.name" />
          </div>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitDistrict">Add District</button>
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
const areas = reactive([]);
const loading = ref("");

const error_message = ref("");

const district = reactive({
  name: "",
  area_id: "",
});

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/area", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  areas.value = data.value.data;
  console.log(areas.value);
});

let submitDistrict = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/district", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: district,
    initialCache: false,
  });

  console.log(data.value);
  if (error.value) {
    error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    // alert();
    error_message.value = "Church District added successfully!";
    district.name = "";
    district.area_id = "";
  }
};
</script>

<style></style>
