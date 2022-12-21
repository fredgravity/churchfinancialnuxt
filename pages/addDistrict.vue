<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add district</div>
    </div>
    <Loading :loading="loading" />

    <div v-if="show">
      <Alert :alert="show" />
    </div>

    <div class="card-body md:w-1/2 mx-auto bg-gray-100 shadow-sm mb-4 p-2">
      <form>
        <div class="mb-3 row">
          <label for="district" class="col-md-2 col-form-label">District</label>
          <div class="col-md-10">
            <select class="form-control" id="district" v-model="district.area_id">
              <template v-for="(area, index) in areas.value" :key="index">
                <option :value="area.id">{{ area.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="name" class="col-md-2 col-form-label">District Name</label>
          <div class="col-md-10">
            <input class="form-control" type="text" id="name" v-model="district.name" />
          </div>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="submitDistrict">Add District</button>
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
const areas = reactive([]);
const loading = ref("");
const show = reactive({
  state: "hide",
  message_type: "",
  message: "",
  title: "",
});

const district = reactive({
  name: "",
  area_id: "",
});

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/area", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  areas.value = data.value.data;
  console.log(areas.value);
});

let submitDistrict = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/district", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: district,
    initialCache: false,
  });

  if (error.value) {
    show.state = "show";
    show.message_type = "error";
    show.message = "Church District not added successfully!. Try again";
    show.title = "Add District";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    // error_message.value = error.value.data.message;
  } else {
    // alert();
    show.state = "show";
    show.message_type = "";
    show.message = "Church District added successfully!";
    show.title = "Add District";
    setTimeout(() => {
      show.state = "hide";
    }, 5000);
    district.name = "";
    district.area_id = "";
  }
};
</script>

<style></style>
