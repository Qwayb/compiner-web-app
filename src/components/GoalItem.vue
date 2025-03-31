<template>
  <div
      class="goal-item"
      :class="{ 'active': isCardActive || goal.isTimerRunning }"
      @click="toggleCard"
  >
    <div class="goal-header">
      <h3>{{ goal.title }}</h3>
      <transition name="fade">
        <img
            v-if="isCardActive || goal.isTimerRunning"
            @click.stop="showDeleteModal = true"
            class="delete-icon"
            src="../assets/images/trash-icon.png"
            alt="Удалить"
        >
      </transition>
    </div>

    <div class="goal-info">
      <span>Цель: {{goal.targetHours}}ч.</span>
      <span>{{ formattedDeadline }}</span>
    </div>

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
      <span class="progress-text">{{ goal.completedHours.toFixed(1) }} / {{ goal.targetHours }} часов</span>
    </div>

    <transition name="fade">
      <div
          v-if="isCardActive || goal.isTimerRunning"
          class="play-stop-button"
          @click.stop
      >
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
          >
        </button>
      </div>
    </transition>

    <transition name="slide">
      <div v-if="goal.isTimerRunning" class="timer-display">
        Время: {{ formattedElapsedTime }}
      </div>
    </transition>

    <!-- Модальное окно подтверждения удаления -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="delete-modal">
        <p>Точно хотите удалить?</p>
        <div class="modal-actions">
          <button class="white-button" @click="showDeleteModal = false">Нет</button>
          <button class="underline-button" @click="confirmDelete">да</button>
        </div>
      </div>
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
      timerInterval: null,
      showDeleteModal: false,
      isCardActive: false,
      autoHideTimeout: null
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
    },
  },
  methods: {
    toggleCard() {
      if (this.goal.isTimerRunning) return;

      this.isCardActive = !this.isCardActive;
    },
    toggleTimer() {
      if (!this.goal.isTimerRunning) {
        this.startTimer()
      } else {
        this.stopTimer()
      }
    },
    startTimer() {
      this.goal.isTimerRunning = true
      this.isCardActive = true
      this.elapsedMinutes = 0

      this.progressTimer = setInterval(() => {
        this.$emit('update-progress', {
          id: this.goal.id,
          hours: 1/60
        })
      }, 60000)

      this.timerInterval = setInterval(() => {
        this.elapsedMinutes++
      }, 60000)
    },
    stopTimer() {
      this.goal.isTimerRunning = false
      this.isCardActive = false
      clearInterval(this.progressTimer)
      clearInterval(this.timerInterval)
    },
    confirmDelete() {
      this.$emit('delete-goal', this.goal.id)
      this.showDeleteModal = false
    }
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
    }
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
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
  position: relative;
  align-items: center;
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
  background: transparent;
}

.delete-icon {
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: opacity 0.2s;
  cursor: pointer;
}

.delete-icon:hover {
  opacity: 1;
}

/* Стили для модального окна удаления */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-modal {
  background: #151515;
  padding: 30px;
  border-radius: 15px;
  width: 230px;
}

.delete-modal p {
  margin-bottom: 32px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

/* Анимации */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>