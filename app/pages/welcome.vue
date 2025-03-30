<template>
  <div class="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
    <UCard class="w-full max-w-md">
      <template #header>
        <h1 class="text-3xl font-bold text-center">Своя Игра</h1>
      </template>
      
      <div class="space-y-4 py-4">
        <UButton block to="/" size="xl">Начать игру</UButton>
        <UButton block to="/settings" size="xl" color="gray">Настройки</UButton>
        <UButton block to="/rules" size="xl" color="blue">Правила</UButton>
      </div>
    </UCard>
  </div>
</template>
