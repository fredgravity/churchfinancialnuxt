<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add ministry</div>
    </div>

    <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
      {{ error_message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="name" class="col-md-2 col-form-label">Ministry Name</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="name" v-model="ministry.name" />
          </div>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitMinistry">Add Ministry</button>
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

const ministry = reactive({
  name: "",
});

let submitMinistry = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/ministry", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: ministry,
    initialCache: false,
  });

  console.log(data.value);
  if (error.value) {
    error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    // alert();
    error_message.value = "Church Ministry added successfully!";
    ministry.name = "";
  }
};
</script>

<style></style>
