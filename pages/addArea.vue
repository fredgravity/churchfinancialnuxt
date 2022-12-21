<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add area</div>
    </div>

    <div v-if="show">
      <Alert :alert="show" />
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

const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});

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

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Church Area not added successfully!. Try again";
    show.title = "Add Area";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    show.state = "show";
    show.message_type = "";
    show.message = "Church Area added successfully!";
    show.title = "Add Area";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    area.name = "";
  }
};
</script>

<style></style>
