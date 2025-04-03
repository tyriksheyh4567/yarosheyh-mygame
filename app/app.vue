<!-- svoya_igra/app/app.vue -->
<template>
  <UApp>
    <NuxtPage />
    <noscript>
      <meta http-equiv="refresh" content="0; url=/noscript.html" />
    </noscript>
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