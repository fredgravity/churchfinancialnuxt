<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add ministry</div>
    </div>

    <div v-if="show">
      <Alert :alert="show" />
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
const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});

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

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Church Ministry not added successfully!. Try again";
    show.title = "Add Ministry";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    // alert();
    show.state = "show";
    show.message_type = "";
    show.message = "Church Ministry added successfully!.";
    show.title = "Add Ministry";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    ministry.name = "";
  }
};
</script>

<style></style>
