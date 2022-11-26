<template>
  <div class="p-2 border-b border-blue-300 mb-2">add member</div>

  <div>
    <div class="card mb-4" style="height: 35rem">
      <h5 class="card-header">Members' Summary</h5>
      <div class="table-responsive text-nowrap">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <template v-for="(member, index) in members.value" :key="index">
              <tr>
                <td>
                  <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{ member.attributes.name }}</strong>
                </td>
                <td>{{ member.attributes.gender }}</td>
                <td>
                  {{ member.attributes.dob }}
                </td>
                <td>
                  <span class="badge bg-label-primary me-1">{{ member.attributes.email }}</span>
                </td>
                <td>
                  {{ member.attributes.phone }}
                </td>
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" :href="'/member-' + member.id"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                      <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const members = reactive([]);

console.log(members);

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh } = await useFetch(api_base + "/member", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });

  members.value = data.value.data;
});
</script>

<style></style>
