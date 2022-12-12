<template>
  <div>
    <div>
      <div class="p-2 border-b border-blue-300 mb-2">add member details</div>
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
          <p class="text-muted mb-0">Marital Status: {{ member.attributes.marital_status }}</p>
        </div>
      </div>
    </div>
    <hr class="border-b border-blue-300 mb-4" />
    <div class="row">
      <div class="w-full mx-2">
        <div class="nav-align-top mb-4">
          <ul class="nav nav-pills mb-3" role="tablist">
            <li class="nav-item">
              <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#pills-spouse" aria-controls="navs-pills-top-home" aria-selected="true">Spouse</button>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#pills-children" aria-controls="navs-pills-top-profile" aria-selected="false">Children</button>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#pills-parent" aria-controls="navs-pills-top-messages" aria-selected="false">Parent</button>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#pills-occupation" aria-controls="navs-pills-top-messages" aria-selected="false">Occupation</button>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="pills-spouse" role="tabpanel">
              <MoreInfoSpouse />
            </div>
            <div class="tab-pane fade" id="pills-children" role="tabpanel">
              <MoreInfoChildren />
            </div>
            <div class="tab-pane fade" id="pills-parent" role="tabpanel">
              <MoreInfoParent />
            </div>
            <div class="tab-pane fade" id="pills-occupation" role="tabpanel">
              <MoreInfoOccupation />
            </div>
          </div>
        </div>
      </div>
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
</script>

<style></style>
