<template>
  <div class="app">
    <h1>Мои цели</h1>
    <div class="cards-list">
        <div class="goals-list">
            <div class="card-add">
              <div class="add-goal">
                <button @click="showModal = true" class="add-button"><img src="../assets/images/add-button.png" alt="add-goal "></button>
              </div>
            </div>
            <GoalItem
                v-for="goal in goals"
                :key="goal.id"
                :goal="goal"
                @update-progress="updateGoalProgress"
            />
        </div>
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
  h1 {
    font-size: 20px;
  }

  .card-add{
    width: 460px;
    height: 150px;
    padding: 30px;
    border-radius: 15px;
    background: #151515;
  }

  .add-goal{
    display: flex;
    justify-content: center;
  }

  .goal-item{
    width: 460px;
    padding: 30px;
    border-radius: 15px;
    background: #151515;
  }

  .goals-list{
    max-width: 1420px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;

  }

  .cards-list{
    max-width: 1420px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
</style>