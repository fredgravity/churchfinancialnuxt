<template>
  <div>
    <div class="flex justify-center w-full" v-if="loading">
      <div class="spinner-border text-primary z-50" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: Boolean,
});
</script>

<style></style>
