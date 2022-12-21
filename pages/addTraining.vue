<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">add training</div>

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="participant" class="col-md-2 col-form-label">Participant</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="participant" v-model="training.participant" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="position" class="col-md-2 col-form-label">Position</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="position" v-model="training.position" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="phone" class="col-md-2 col-form-label">Phone</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="phone" v-model="training.phone" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="email" class="col-md-2 col-form-label">Email</label>
          <div class="col-md-10">
            <input class="form-control" type="email" id="email" v-model="training.email" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Training Item</label>
          <div class="col-md-10">
            <select class="form-control" id="ministry" v-model="training.training_item_id" @change="getTraining($event)">
              <template v-for="(item, index) in trainingItems.value" :key="index">
                <option v-if="item.attributes.name" :value="item.id">{{ item.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="startDate" class="col-md-2 col-form-label">Start Date</label>
          <div class="col-md-10">
            <input class="form-control" type="date" id="startDate" v-model="training.startDate" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="endDate" class="col-md-2 col-form-label">End Date</label>
          <div class="col-md-10">
            <input class="form-control" type="date" id="endDate" v-model="training.endDate" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="venue" class="col-md-2 col-form-label">Venue</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="venue" v-model="training.venue" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Ministry</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="endDate" v-model="training.ministry" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="assembly" class="col-md-2 col-form-label">Assembly</label>
          <div class="col-md-10">
            <select class="form-control" id="assembly" v-model="training.assembly" @change="getAssembly($event)">
              <template v-for="(item, index) in assemblies.value" :key="index">
                <option v-if="item.attributes.name" :value="item.id">{{ item.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="district" class="col-md-2 col-form-label">District</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="district" v-model="training.district" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="area" class="col-md-2 col-form-label">Area</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="area" v-model="training.area" />
          </div>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitTraining">Add Training</button>
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
const assemblies = reactive([]);
const trainingItems = reactive([]);
const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});
const training = reactive({
  training_item_id: "",
  participant: "",
  position: "",
  phone: "",
  email: "",
  startDate: "",
  endDate: "",
  venue: "",
  ministry: "",
  assembly: "",
  district: "",
  area: "",
});

const error_message = ref("");

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
  console.log(assemblies.value);
});

const getTraining = async (event) => {
  let result = trainingItems.value.filter((res) => {
    return res.id == event.target.value;
  });

  training.startDate = result[0].attributes.startDate;
  training.endDate = result[0].attributes.endDate;
  training.venue = result[0].attributes.venue;
  training.ministry = result[0].attributes.ministry_name;
};

const getAssembly = async (event) => {
  let result = assemblies.value.filter((res) => {
    return res.id == event.target.value;
  });

  training.district = result[0].attributes.district;
  training.area = result[0].attributes.area.name;
};

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/training-item", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  trainingItems.value = data.value.data;
});

let submitTraining = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/training", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: training,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Training added successfully!. Try again";
    show.title = "Add Training";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    show.state = "show";
    show.message_type = "";
    show.message = "Training added successfully!";
    show.title = "Add Training";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    training.training_item_id = "";
    training.startDate = "";
    training.endDate = "";
    training.ministry = "";
    training.participant = "";
    training.position = "";
    training.venue = "";
    training.phone = "";
    training.assembly = "";
    training.area = "";
    training.district = "";
    training.email = "";
  }
};
</script>

<style></style>
