<template>
  <div class="goal-item">
    <div class="goal-header">
      <h3>{{ goal.title }}</h3>
      <span>Дедлайн: {{ formattedDeadline }}</span>
    </div>

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
      <span class="progress-text">{{ goal.completedHours.toFixed(1) }} / {{ goal.targetHours }} часов</span>
    </div>

    <div v-if="goal.isTimerRunning" class="timer-display">
      ⏱️ Таймер: {{ formattedElapsedTime }}
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
  data() {
    return {
      elapsedMinutes: 0,
      timerInterval: null
    }
  },
  computed: {
    progressPercentage() {
      return Math.min((this.goal.completedHours / this.goal.targetHours) * 100, 100)
    },
    formattedDeadline() {
      return new Date(this.goal.deadline).toLocaleDateString()
    },
    formattedElapsedTime() {
      const hours = Math.floor(this.elapsedMinutes / 60)
      const minutes = this.elapsedMinutes % 60
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
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
      this.elapsedMinutes = 0

      // Таймер для обновления progress
      this.progressTimer = setInterval(() => {
        this.$emit('update-progress', {
          id: this.goal.id,
          hours: 1/60 // 1 минута в часах
        })
      }, 60000) // Обновлять каждую минуту

      // Таймер для отображения времени
      this.timerInterval = setInterval(() => {
        this.elapsedMinutes++
      }, 60000)
    },
    stopTimer() {
      this.goal.isTimerRunning = false
      clearInterval(this.progressTimer)
      clearInterval(this.timerInterval)
    }
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
    }
  }
}
</script>

<style>
.goal-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  position: relative;
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
  margin-top: 10px;
}

.timer-button.active {
  background-color: #f44336;
}

.timer-display {
  background-color: #f8f8f8;
  padding: 5px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  display: inline-block;
  font-size: 14px;
}
</style>