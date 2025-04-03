<!-- svoya_igra/app/app.vue -->
<template>
  <UApp>
    <Loading v-if="isLoading" />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
useHead({
  title: 'Своя Игра',
  meta: [
    { name: 'description', content: 'Своя игра на Nuxt 4.' }
  ],
})
</script>