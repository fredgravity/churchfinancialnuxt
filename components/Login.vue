<template>
  <div>
    <div class="main-wrapper">
      <div class="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative">
        <div class="bg-blue-500">
          <!-- <div class="col-lg-7 col-md-5 modal-bg-img" style="background-image: url(assets/img/backgrounds/20.jpg)"></div> -->
          <div class="w-96 bg-white rounded-sm shadow-sm">
            <div class="p-3">
              <!-- <div class="text-center w-full">
                <img src="/assets/img/logo/is evolution.png" class="w-12 mx-auto text-center" alt="wrapkit" />
              </div> -->
              <h2 class="mt-3 text-center">Sign In</h2>
              <p class="text-center">Enter your email address and password to access dashboard panel.</p>
              <form class="mt-4" @submit.prevent="submitLogin">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="uname">Email</label>
                      <input class="form-control" id="uname" type="email" v-model="loginForm.email" placeholder="enter your Email" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="pwd">Password</label>
                      <input class="form-control" id="pwd" type="password" v-model="loginForm.password" placeholder="enter your password" />
                    </div>
                  </div>
                  <template v-if="loading">
                    <div class="col-lg-12 text-center">
                      <button type="submit" class="btn btn-block btn-dark">Login</button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="col-lg-12 text-center">
                      <button type="submit" class="btn btn-block btn-dark">Loading...</button>
                    </div>
                  </template>
                  <div class="col-lg-12 text-center mt-5 text-blue-400">Church Management Solution <a href="#" class="text-danger"></a></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const loading = ref("false");

const loginForm = reactive({
  email: "admin@me.com",
  password: "admin@123",
});

const loginStore = useLoginStore();

const submitLogin = async () => {
  loading.value = !loading.value;
  loginStore.login(loginForm);
};
</script>

<style scoped src="../assets/css/login.css"></style>
