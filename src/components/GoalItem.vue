<template>
  <div class="goal-item">
    <div class="goal-header">
      <h3>{{ goal.title }}</h3>
    </div>

    <div class="goal-info">
      <span>Цель: {{goal.targetHours}}ч.</span>
      <span>{{ formattedDeadline }}</span>
    </div>

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
      <span class="progress-text">{{ goal.completedHours.toFixed(1) }} / {{ goal.targetHours }} часов</span>

    </div>

    <div class="play-stop-button">
      <button
          @click="toggleTimer"
          :class="{ 'timer-button': true, 'active': goal.isTimerRunning }"
      >

      <img
          v-if="goal.isTimerRunning"
          src="../assets/images/stop-button.png"
          alt="stop"
          class="stop-icon"
      >
      <img
          v-else
          src="../assets/images/play-button.png"
          alt="play"
      >    </button>
    </div>

    <div v-if="goal.isTimerRunning" class="timer-display">
    Время: {{ formattedElapsedTime }}
    </div>
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
.stop-icon{
  margin-bottom: 16px;
}

.timer-display{
  display: flex;
  justify-content: center;
  color: rgba(218,218,218, 0.5);
  font-weight: bold;
  font-size: 15px;
}

.play-stop-button{
  width: 100%;
  display: flex;
  justify-content: center;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.goal-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.progress-container {
  height: 8px;
  background-color: #252525;
  border-radius: 10px;
  margin-bottom: 32px;
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
  color: rgba(218,218,218, 0.5);
}

.timer-button {
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>