<template>
  <div>
    <div class="p-2 border-b border-blue-300 mb-2">Register User</div>

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="name" class="col-md-2 col-form-label">Name</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="name" v-model="user.name" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="email" class="col-md-2 col-form-label">Email</label>
          <div class="col-md-10">
            <input class="form-control" type="email" id="email" v-model="user.email" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="password" class="col-md-2 col-form-label">Password</label>
          <div class="col-md-10">
            <input class="form-control" type="password" id="password" v-model="user.password" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="password2" class="col-md-2 col-form-label">Password Confirm</label>
          <div class="col-md-10">
            <input class="form-control" type="password" id="password2" v-model="user.password_confirmation" />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="role" class="col-md-2 col-form-label">Role</label>
          <div class="col-md-10">
            <select class="form-control" id="role" v-model="user.role">
              <!-- <option selected>Open this select menu</option> -->
              <option selected value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div class="text-center mb-3">
          <button type="button" class="btn btn-primary" @click="submitUser">Add User</button>
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

const error_message = ref("");

const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "",
});

let submitUser = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: user,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Church User not added successfully!. Try again";
    show.title = "Add User";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
  } else {
    show.state = "show";
    show.message_type = "";
    show.message = "Church User added successfully!.";
    show.title = "Add User";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    user.name = "";
    user.email = "";
    user.password = "";
    user.password_confirmation = "";
    user.role = "";
  }
};
</script>

<style></style>
