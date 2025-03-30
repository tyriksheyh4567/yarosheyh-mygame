<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Настройки игры</h1>
    
    <UCard class="mb-6">
      <template #header>
        <h2 class="text-xl font-bold">Игроки</h2>
      </template>
      
      <div class="space-y-4">
        <div v-for="(player, index) in players" :key="index" class="flex items-center gap-4">
          <UInput v-model="player.name" :placeholder="`Игрок ${index + 1}`" />
          <UButton color="red" icon="i-heroicons-trash" @click="removePlayer(index)" :disabled="players.length <= 1" />
        </div>
        
        <UButton @click="addPlayer" :disabled="players.length >= 6">Добавить игрока</UButton>
      </div>
    </UCard>
    
    <UCard class="mb-6">
      <template #header>
        <h2 class="text-xl font-bold">Категории и вопросы</h2>
      </template>
      
      <div class="space-y-6">
        <div v-for="(category, categoryIndex) in categories" :key="categoryIndex" class="border p-4 rounded-lg">
          <div class="flex items-center gap-4 mb-4">
            <UInput v-model="category.name" placeholder="Название категории" />
            <UButton color="red" icon="i-heroicons-trash" @click="removeCategory(categoryIndex)" :disabled="categories.length <= 1" />
          </div>
          
          <div v-for="points in [100, 200, 300, 400, 500]" :key="points" class="grid grid-cols-2 gap-4 mb-4">
            <div class="font-bold">{{ points }} очков:</div>
            <div class="space-y-2">
              <UTextarea v-model="category.questions[points].question" placeholder="Вопрос" rows="2" />
              <UTextarea v-model="category.questions[points].answer" placeholder="Ответ" rows="2" />
            </div>
          </div>
        </div>
        
        <UButton @click="addCategory" :disabled="categories.length >= 6">Добавить категорию</UButton>
      </div>
    </UCard>
    
    <div class="flex justify-between">
      <UButton color="gray" to="/">Назад</UButton>
      <UButton color="green" @click="saveSettings">Сохранить настройки</UButton>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core';

const players = useLocalStorage('svoya-igra-players', [
  { name: 'Игрок 1', score: 0 },
  { name: 'Игрок 2', score: 0 },
  { name: 'Игрок 3', score: 0 }
]);

const defaultCategory = {
  name: '',
  questions: {
    100: { question: '', answer: '' },
    200: { question: '', answer: '' },
    300: { question: '', answer: '' },
    400: { question: '', answer: '' },
    500: { question: '', answer: '' }
  }
};

const categories = useLocalStorage('svoya-igra-categories', [
  { 
    name: 'История',
    questions: {
      100: { question: 'Год основания Москвы?', answer: '1147' },
      200: { question: 'Кто был первым президентом США?', answer: 'Джордж Вашингтон' },
      300: { question: 'В каком году началась Вторая мировая война?', answer: '1939' },
      400: { question: 'Кто был первым человеком в космосе?', answer: 'Юрий Гагарин' },
      500: { question: 'Какая империя была самой большой в истории?', answer: 'Британская империя' }
    }
  },
  { 
    name: 'Наука',
    questions: {
      100: { question: 'Химический символ золота?', answer: 'Au' },
      200: { question: 'Самая близкая к Земле звезда?', answer: 'Солнце' },
      300: { question: 'Формула воды?', answer: 'H2O' },
      400: { question: 'Кто открыл закон всемирного тяготения?', answer: 'Исаак Ньютон' },
      500: { question: 'Что измеряется в Герцах?', answer: 'Частота' }
    }
  },
  { 
    name: 'География',
    questions: {
      100: { question: 'Самая длинная река в мире?', answer: 'Нил' },
      200: { question: 'Столица Австралии?', answer: 'Канберра' },
      300: { question: 'Самая высокая гора в мире?', answer: 'Эверест' },
      400: { question: 'Сколько океанов на Земле?', answer: '5 (Тихий, Атлантический, Индийский, Северный Ледовитый, Южный)' },
      500: { question: 'Какая страна имеет наибольшее количество границ с другими странами?', answer: 'Китай и Россия (по 14)' }
    }
  },
  { 
    name: 'Литература',
    questions: {
      100: { question: 'Кто написал "Войну и мир"?', answer: 'Лев Толстой' },
      200: { question: 'Автор "Гамлета"?', answer: 'Уильям Шекспир' },
      300: { question: 'Кто создал Шерлока Холмса?', answer: 'Артур Конан Дойл' },
      400: { question: 'Автор романа "Мастер и Маргарита"?', answer: 'Михаил Булгаков' },
      500: { question: 'Какое произведение начинается со слов "В начале было Слово"?', answer: 'Евангелие от Иоанна (Библия)' }
    }
  },
  { 
    name: 'Кино',
    questions: {
      100: { question: 'Кто сыграл Гарри Поттера в фильмах?', answer: 'Дэниел Рэдклифф' },
      200: { question: 'Какой фильм получил больше всего Оскаров?', answer: '"Титаник", "Бен-Гур" и "Властелин колец: Возвращение короля" (по 11)' },
      300: { question: 'Кто режиссер фильма "Аватар"?', answer: 'Джеймс Кэмерон' },
      400: { question: 'Какой актер сыграл Джокера в фильме "Темный рыцарь"?', answer: 'Хит Леджер' },
      500: { question: 'Какой фильм считается первым полнометражным анимационным фильмом Disney?', answer: '"Белоснежка и семь гномов"' }
    }
  }
]);

function addPlayer() {
  players.value.push({ name: `Игрок ${players.value.length + 1}`, score: 0 });
}

function removePlayer(index) {
  if (players.value.length > 1) {
    players.value.splice(index, 1);
  }
}

function addCategory() {
  if (categories.value.length < 6) {
    categories.value.push(JSON.parse(JSON.stringify(defaultCategory)));
  }
}

function removeCategory(index) {
  if (categories.value.length > 1) {
    categories.value.splice(index, 1);
  }
}

function saveSettings() {
  // Reset scores when saving settings
  for (const player of players.value) {
    player.score = 0;
  }
  
  // Show notification
  const toast = useToast();
  toast.add({
    title: 'Настройки сохранены',
    description: 'Все изменения успешно сохранены',
    color: 'green'
  });
  
  // Navigate back to game
  navigateTo('/');
}
</script>
