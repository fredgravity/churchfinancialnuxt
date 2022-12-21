<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/checkauth", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });
  loginStore.setUserID(data.value[1]);
  if (!data.value[0]) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  }
});
</script>

<style></style>
