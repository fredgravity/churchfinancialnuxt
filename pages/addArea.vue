<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add area</div>
    </div>

    <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
      {{ error_message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="name" class="col-md-2 col-form-label">Area Name</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="name" v-model="area.name" />
          </div>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitArea">Add Area</button>
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

const area = reactive({
  name: "",
});

let submitArea = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/area", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: area,
    initialCache: false,
  });

  console.log(data.value);
  if (error.value) {
    error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    // alert();
    error_message.value = "Church Area added successfully!";
    area.name = "";
  }
};
</script>

<style></style>
