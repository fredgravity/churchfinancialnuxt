<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">Member Details</div>
    </div>

    <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
      {{ error_message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="card-body">
      <div class="d-flex align-items-start align-items-sm-center gap-4">
        <img src="../assets/img/avatars/1.png" alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar" />
        <div class="button-wrapper" v-if="member.attributes">
          <p class="text-muted mb-0">Name: {{ member.attributes.name }}</p>
          <p class="text-muted mb-0">Gender: {{ member.attributes.gender }}</p>
          <p class="text-muted mb-0">DOB: {{ member.attributes.dob }}</p>
          <p class="text-muted mb-0">Marital Status: {{ member.attributes.status }}</p>
        </div>
      </div>
    </div>
    <hr class="my-0" />
    <div class="ml-4 mt-3 font-bold">Spouse Information</div>
    <div class="card-body">
      <form id="formAccountSettings" method="POST" onsubmit="return false">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="name" class="form-label">Spouse Name</label>
            <input class="form-control" type="text" id="name" v-model="spouse.name" name="name" autofocus />
          </div>
          <div class="mb-3 col-md-6">
            <label for="home_town" class="form-label">Home Town</label>
            <input class="form-control" type="text" name="home_town" id="home_town" v-model="spouse.home_town" />
          </div>

          <div class="mb-3 col-md-6">
            <label class="form-label" for="phone">Phone Number</label>
            <div class="input-group input-group-merge">
              <!-- <span class="input-group-text">US (+1)</span> -->
              <input type="text" id="phone" name="phone" class="form-control" placeholder="202 555 0111" v-model="spouse.phone" />
            </div>
          </div>
          <div class="mb-3 col-md-6">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address" name="address" placeholder="Address" v-model="spouse.address" />
          </div>

          <div class="mb-3 col-md-6">
            <label for="dob" class="col-md-2 col-form-label">Date of Birth</label>
            <div class="col-md-10">
              <input class="form-control" type="date" id="dob" v-model="spouse.dob" />
            </div>
          </div>

          <div class="mb-3 col-md-6">
            <label for="status" class="form-label">Status</label>
            <select id="status" class="select2 form-select" v-model="spouse.status">
              <!-- <option value="">Select Language</option> -->
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary me-2" @click="submitSpouse">Add Spouse</button>
        </div>
      </form>
    </div>

    <hr class="my-0" />
    <div class="ml-4 mt-3 font-bold">Children Information</div>
    <div class="card-body">
      <form id="formAccountSettings" method="POST" onsubmit="return false">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="name" class="form-label">Child Name</label>
            <input class="form-control" type="text" id="name" name="name" v-model="child.name" autofocus />
          </div>

          <div class="mb-3 col-md-6">
            <label for="dob" class="col-md-2 col-form-label">Date of Birth</label>
            <div class="col-md-10">
              <input class="form-control" type="date" id="dob" v-model="child.dob" />
            </div>
          </div>

          <div class="mb-3 col-md-6">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" class="select2 form-select" v-model="child.gender">
              <!-- <option value="">Select Language</option> -->
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary me-2" @click="submitChild">Add Child</button>
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
const route = useRoute();
const member = ref([]);
const error_message = ref("");

const spouse = reactive({
  name: "",
  status: "",
  phone: "",
  address: "",
  home_town: "",
  dob: "",
  member_id: route.params.id,
});

const child = reactive({
  name: "",
  gender: "",
  dob: "",
  member_id: route.params.id,
});

onMounted(async () => {
  const member_id = route.params.id;

  const { data, error, refresh } = await useFetch(api_base + "/member/" + member_id, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  console.log(data.value);
  member.value = data.value.data;
});

let submitSpouse = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/member-spouse", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: spouse,
    initialCache: false,
  });

  console.log(data.value);
  if (error.value) {
    error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    error_message.value = "Church member's spouse added successfully!";
    spouse.name = "";
    spouse.phone = "";
    spouse.home_town = "";
    spouse.address = "";
    spouse.status = "";
    spouse.dob = "";
  }
};

let submitChild = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/member-children", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: child,
    initialCache: false,
  });

  console.log(data.value);
  if (error.value) {
    error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    error_message.value = "Church member's child added successfully!";
    spouse.name = "";
    spouse.gender = "";
    spouse.home_town = "";
    spouse.dob = "";
  }
};
</script>

<style></style>
