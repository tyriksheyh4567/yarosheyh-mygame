<template>
  <div class="loading-screen">
    <div class="cradle">
      <div v-for="(ball, index) in balls" :key="index" class="ball" :style="{ animationDelay: `${index * 0.2}s`, transform: `scale(${ball.scale})` }"></div>
    </div>
    <p class="loading-text">Loading...</p>
  </div>
</template>

<script setup>
const balls = Array.from({ length: 6 }, (_, index) => ({
  scale: index === 0 ? 1.5 : 1 - index * 0.1 // Adjust the scale for each ball
}));
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.cradle {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100px; /* Adjust height as needed */
}

.ball {
  width: 30px;
  height: 30px;
  background-color: #3498db; /* Ball color */
  border-radius: 50%;
  margin: 0 5px;
  animation: bounce 0.6s ease-in-out infinite alternate;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
}

.loading-text {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #3498db;
}
</style>
