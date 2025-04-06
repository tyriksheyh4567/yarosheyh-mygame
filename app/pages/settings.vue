<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Настройки игры</h1>
    
    <UCard class="mb-6">
      <template #header>
        <h2 class="text-xl font-bold">Игроки</h2>
      </template>
      
      <div class="space-y-4 p-4">
        <div v-for="(player, index) in players" :key="index" class="flex items-center gap-4">
          <UInput v-model="player.name" :placeholder="`Игрок ${index + 1}`" />
          <UButton color="red" icon="i-heroicons-trash" :disabled="players.length <= 1" @click="removePlayer(index)"  />
        </div>
        
        <UButton :disabled="players.length >= 6" @click="addPlayer">Добавить игрока</UButton>
      </div>
    </UCard>
    
    <!-- Example of correct UTextarea usage -->
    <UCard class="mb-6">
      <template #header>
        <h2 class="text-xl font-bold">Настройки вопросов</h2>
      </template>
      
      <div class="space-y-4 p-4">
        <UTextarea 
          v-model="sampleAnswer" 
          placeholder="Ответ" 
          :rows="2" 
          class="w-full"
        />
      </div>
    </UCard>
    
    <div class="flex justify-between">
      <UButton color="gray" to="/game">Назад</UButton>
      <UButton color="green" @click="saveSettings">Сохранить настройки</UButton>
    </div>
  </div>
</template>

<script setup>
const players = ref([
  { name: 'Игрок 1', score: 0 },
  { name: 'Игрок 2', score: 0 },
  { name: 'Игрок 3', score: 0 }
]);

const sampleAnswer = ref("Белоснежка и семь гномов");

function addPlayer() {
  players.value.push({ name: `Игрок ${players.value.length + 1}`, score: 0 });
}

function removePlayer(index) {
  if (players.value.length > 1) {
    players.value.splice(index, 1);
  }
}

function saveSettings() {
  // Save players data
  localStorage.setItem('gamePlayers', JSON.stringify(players.value));
  
  // Save other settings if needed
  const settings = {
    sampleAnswer: sampleAnswer.value,
    // Add other settings here
    lastSaved: new Date().toISOString()
  };
  localStorage.setItem('gameSettings', JSON.stringify(settings));
  
  // Navigate to game page
  navigateTo('/game');
}

// Load saved settings on component mount
onMounted(() => {
  const savedPlayers = localStorage.getItem('gamePlayers');
  if (savedPlayers) {
    players.value = JSON.parse(savedPlayers);
  }
  
  const savedSettings = localStorage.getItem('gameSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    sampleAnswer.value = settings.sampleAnswer;
    // Load other settings here
  }
});
</script>
