<template>
  <div class="app">
    <h1>Мои цели</h1>
    <button @click="showModal = true" class="add-button">+</button>

    <div class="goals-list">
      <GoalItem
          v-for="goal in goals"
          :key="goal.id"
          :goal="goal"
          @update-progress="updateGoalProgress"
      />
    </div>

    <AddGoalModal
        v-if="showModal"
        @close="showModal = false"
        @create-goal="createNewGoal"
    />
  </div>
</template>

<script>
import GoalItem from '@/components/GoalItem.vue'
import AddGoalModal from '@/components/AddGoalModal.vue'

export default {
  components: { GoalItem, AddGoalModal },
  data() {
    return {
      showModal: false,
      goals: [
        // Пример цели
        {
          id: 1,
          title: 'Изучение Vue.js',
          targetHours: 10,
          completedHours: 3,
          deadline: '2023-12-31',
          isTimerRunning: false
        }
      ]
    }
  },
  methods: {
    createNewGoal(newGoal) {
      this.goals.push({
        id: Date.now(), // Простой способ получить уникальный ID
        title: newGoal.title,
        targetHours: newGoal.targetHours,
        completedHours: 0,
        deadline: newGoal.deadline,
        isTimerRunning: false
      })
      this.showModal = false
    },
    updateGoalProgress({ id, hours }) {
      const goal = this.goals.find(g => g.id === id)
      if (goal) {
        goal.completedHours += hours
      }
    }
  }
}
</script>

<style>
.add-button {
  font-size: 24px;
  padding: 5px 15px;
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

.goals-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>