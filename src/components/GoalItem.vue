<template>
  <div class="goal-item">
    <div class="goal-header">
      <h3>{{ goal.title }}</h3>
      <span>Дедлайн: {{ formattedDeadline }}</span>
    </div>

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
      <span class="progress-text">{{ goal.completedHours }} / {{ goal.targetHours }} часов</span>
    </div>

    <button
        @click="toggleTimer"
        :class="{ 'timer-button': true, 'active': goal.isTimerRunning }"
    >
      {{ goal.isTimerRunning ? '⏸️ Остановить' : '⏱️ Начать отсчёт' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    goal: {
      type: Object,
      required: true
    }
  },
  computed: {
    progressPercentage() {
      return Math.min((this.goal.completedHours / this.goal.targetHours) * 100, 100)
    },
    formattedDeadline() {
      return new Date(this.goal.deadline).toLocaleDateString()
    }
  },
  methods: {
    toggleTimer() {
      if (!this.goal.isTimerRunning) {
        this.startTimer()
      } else {
        this.stopTimer()
      }
    },
    startTimer() {
      this.goal.isTimerRunning = true
      this.timerInterval = setInterval(() => {
        this.$emit('update-progress', {
          id: this.goal.id,
          hours: 0.0166667 // 1 минута в часах
        })
      }, 60000) // Обновлять каждую минуту
    },
    stopTimer() {
      this.goal.isTimerRunning = false
      clearInterval(this.timerInterval)
    }
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
  }
}
</script>

<style>
.goal-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.progress-container {
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #42b983;
  border-radius: 10px;
  transition: width 0.3s;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #333;
}

.timer-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.timer-button.active {
  background-color: #f44336;
}
</style>