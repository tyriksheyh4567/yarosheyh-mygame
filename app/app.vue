<!-- svoya_igra/app/app.vue -->
<template>
  <UApp>
    <Loading v-if="isLoading" />
    <NuxtPage />
  </UApp>
</template>

<script setup>
import { UApp } from '#components';
import { ref } from 'vue';
import Loading from '~/components/Loading.vue';

const isLoading = ref(true);

// Simulate loading state for demonstration
setTimeout(() => {
  isLoading.value = false; // Hide loading after 3 seconds
}, 3000);
</script>