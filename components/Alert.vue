<template>
  <div v-if="alert">
    <div class="bs-toast toast toast-placement-ex m-3 fade top-0 end-0" :class="[props.alert.state, props.alert.message_type == 'error' ? 'bg-danger' : 'bg-secondary']" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
      <div class="toast-header">
        <i class="bx bx-bell me-2"></i>
        <div class="me-auto fw-semibold">{{ props.alert.title }}</div>
        <small>Just Now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">{{ props.alert.message }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  alert: Object,
});
</script>

<style></style>
