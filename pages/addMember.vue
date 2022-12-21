<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">add member</div>

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="name" class="col-md-2 col-form-label">Name</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="name" v-model="member.name" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="email" class="col-md-2 col-form-label">Email</label>
          <div class="col-md-10">
            <input class="form-control" type="email" id="email" v-model="member.email" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="home_town" class="col-md-2 col-form-label">Home Town</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="home_town" v-model="member.home_town" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="phone" class="col-md-2 col-form-label">Phone</label>
          <div class="col-md-10">
            <input class="form-control" type="tel" id="phone" v-model="member.phone" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="dob" class="col-md-2 col-form-label">Date of Birth</label>
          <div class="col-md-10">
            <input class="form-control" type="date" id="dob" v-model="member.dob" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="gender" class="col-md-2 w-full col-form-label">Gender</label>
          <div class="col-md-10">
            <select class="form-control" id="gender" v-model="member.gender">
              <!-- <option selected>Open this select menu</option> -->
              <option selected value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="marital_status" class="col-md-2 col-form-label">Marital Status</label>
          <div class="col-md-10">
            <select class="form-control" id="marital_status" v-model="member.marital_status">
              <!-- <option selected>Open this select menu</option> -->
              <option selected value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="assembly" class="col-md-2 col-form-label">Assembly</label>
          <div class="col-md-10">
            <select class="form-control" id="assembly" v-model="member.assembly_id">
              <template v-for="(assembly, index) in assemblies.value" :key="index">
                <option v-if="assembly.attributes.name" :value="assembly.id">{{ assembly.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Ministry</label>
          <div class="col-md-10">
            <select class="form-control" id="ministry" v-model="member.ministry_id">
              <template v-for="(ministry, index) in ministries.value" :key="index">
                <option v-if="ministry.attributes.name" :value="ministry.id">{{ ministry.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>
        <div class="mb-3 row mx-1">
          <label for="Address" class="col-md-2 col-form-label">Address</label>
          <textarea class="form-control" id="Address" rows="3" v-model="member.address"></textarea>
        </div>
        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitMember">Add Member</button>
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
const ministries = reactive([]);
const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});

// console.log(assemblies);

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
});

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
});

const error_message = ref("");

const member = reactive({
  name: "",
  email: "",
  home_town: "",
  phone: "",
  dob: "",
  gender: "",
  assembly_id: "",
  ministry_id: "",
  marital_status: "",
  address: "",
});

let submitMember = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/member", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: member,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Church member not added successfully!. Try again";
    show.title = "Add Member";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    show.state = "show";
    show.message_type = "";
    show.message = "Church member added successfully!.";
    show.title = "Add Member";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    member.name = "";
    member.email = "";
    member.home_town = "";
    member.phone = "";
    member.dob = "";
    member.gender = "";
    member.marital_status = "";
    member.address = "";
    member.ministry_id = "";
    member.assembly_id = "";
  }
};
</script>

<style></style>
