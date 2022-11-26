<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add assembly</div>
    </div>

    <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
      {{ error_message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
          <label for="area" class="col-md-2 col-form-label">Area</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="area" v-model="assembly.area" />
          </div>
        </div>

        <div class="mb-3 row mx-1">
          <label for="district" class="col-md-2 col-form-label">District</label>
          <textarea class="form-control" id="district" rows="3" v-model="assembly.district"></textarea>
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

const error_message = ref("");

const assembly = reactive({
  name: "",
  area: "",
  district: "",
  pastor: "",
});

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

  console.log(data.value);
  if (error.value) {
    error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    // alert();
    error_message.value = "Church Assembly added successfully!";
    assembly.name = "";
    assembly.area = "";
    assembly.district = "";
    assembly.pastor = "";
  }
};
</script>

<style></style>
