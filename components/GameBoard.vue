<template>
  <div class="game-board">
    <h1 class="text-center text-2xl font-bold mb-6">Своя Игра</h1>
    
    <div class="grid grid-cols-1 gap-4">
      <!-- Categories -->
      <div class="grid grid-cols-5 gap-4">
        <div v-for="(category, index) in categories" :key="index" class="category-header bg-blue-800 text-white p-4 text-center font-bold rounded">
          {{ category.name }}
        </div>
      </div>
      
      <!-- Questions -->
      <div v-for="points in [100, 200, 300, 400, 500]" :key="points" class="grid grid-cols-5 gap-4">
        <UButton
          v-for="(category, categoryIndex) in categories"
          :key="`${categoryIndex}-${points}`"
          :disabled="isQuestionAnswered(categoryIndex, points)"
          color="blue"
          variant="solid"
          class="question-cell h-20 text-xl font-bold"
          @click="selectQuestion(categoryIndex, points)"
        >
          {{ isQuestionAnswered(categoryIndex, points) ? '' : points }}
        </UButton>
      </div>
    </div>
    
    <!-- Question Modal -->
    <UModal v-model="showQuestionModal">
      <UCard>
        <template #header>
          <div class="text-xl font-bold">
            {{ selectedCategory?.name }} - {{ selectedPoints }} очков
          </div>
        </template>
        
        <div class="text-center text-xl my-8">
          {{ currentQuestion?.question }}
        </div>
        
        <template #footer>
          <div class="flex justify-between">
            <UButton @click="showAnswer" :disabled="answerRevealed">Показать ответ</UButton>
            <div v-if="answerRevealed" class="text-lg font-bold">
              Ответ: {{ currentQuestion?.answer }}
            </div>
            <div class="flex gap-2">
              <UButton color="red" @click="markIncorrect">Неверно</UButton>
              <UButton color="green" @click="markCorrect">Верно</UButton>
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
    
    <!-- Scoreboard -->
    <div class="mt-8 grid grid-cols-3 gap-4">
      <UCard v-for="(player, index) in players" :key="index">
        <div class="text-center">
          <div class="text-lg font-bold">{{ player.name }}</div>
          <div class="text-2xl" :class="player.score >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ player.score }} очков
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const categories = ref([
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

const players = ref([
  { name: 'Игрок 1', score: 0 },
  { name: 'Игрок 2', score: 0 },
  { name: 'Игрок 3', score: 0 }
]);

const answeredQuestions = ref({});
const showQuestionModal = ref(false);
const selectedCategory = ref(null);
const selectedPoints = ref(null);
const currentQuestion = ref(null);
const answerRevealed = ref(false);
const currentPlayerIndex = ref(0);

function isQuestionAnswered(categoryIndex, points) {
  return answeredQuestions.value[`${categoryIndex}-${points}`] === true;
}

function selectQuestion(categoryIndex, points) {
  selectedCategory.value = categories.value[categoryIndex];
  selectedPoints.value = points;
  currentQuestion.value = selectedCategory.value.questions[points];
  showQuestionModal.value = true;
  answerRevealed.value = false;
}

function showAnswer() {
  answerRevealed.value = true;
}

function markCorrect() {
  // Add points to current player
  players.value[currentPlayerIndex.value].score += selectedPoints.value;
  
  // Mark question as answered
  answeredQuestions.value[`${categories.value.indexOf(selectedCategory.value)}-${selectedPoints.value}`] = true;
  
  // Close modal
  showQuestionModal.value = false;
  
  // Move to next player
  currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.value.length;
}

function markIncorrect() {
  // Subtract points from current player
  players.value[currentPlayerIndex.value].score -= selectedPoints.value;
  
  // Mark question as answered
  answeredQuestions.value[`${categories.value.indexOf(selectedCategory.value)}-${selectedPoints.value}`] = true;
  
  // Close modal
  showQuestionModal.value = false;
  
  // Move to next player
  currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.value.length;
}
</script>

<style scoped>
.category-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-cell {
  height: 80px;
}
</style>
