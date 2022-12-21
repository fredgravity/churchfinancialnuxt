<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">add training item</div>

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="name" class="col-md-2 col-form-label">Training Item Name</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="name" v-model="trainingItem.name" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="startDate" class="col-md-2 col-form-label">Start Date</label>
          <div class="col-md-10">
            <input class="form-control" type="date" id="startDate" v-model="trainingItem.startDate" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="venue" class="col-md-2 col-form-label">Venue</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="venue" v-model="trainingItem.venue" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="endDate" class="col-md-2 col-form-label">End Date</label>
          <div class="col-md-10">
            <input class="form-control" type="date" id="endDate" v-model="trainingItem.endDate" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Ministry</label>
          <div class="col-md-10">
            <select class="form-control" id="ministry" v-model="trainingItem.ministry_id">
              <template v-for="(ministry, index) in ministries.value" :key="index">
                <option v-if="ministry.attributes.name" :value="ministry.id">{{ ministry.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitTrainingItem">Add Training Item</button>
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
const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});

const trainingItem = reactive({
  name: "",
  startDate: "",
  endDate: "",
  ministry_id: "",
  venue: "",
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

let submitTrainingItem = async () => {
  console.log("hi");
  const { data, error, refresh } = await useFetch(api_base + "/training-item", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: trainingItem,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Training item not added successfully!. Try again";
    show.title = "Add District";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    show.state = "show";
    show.message_type = "";
    show.message = "Training item added successfully!";
    show.title = "Add District";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    trainingItem.name = "";
    trainingItem.startDate = "";
    trainingItem.endDate = "";
    trainingItem.ministry_id = "";
    trainingItem.venue = "";
  }
};
</script>

<style></style>
