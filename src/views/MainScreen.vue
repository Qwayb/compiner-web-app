<template>
  <div class="app">
    <HeaderComp/>
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
                  @delete-goal="deleteGoal"
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
import HeaderComp from '@/components/HeaderComp.vue'
import GoalItem from '@/components/GoalItem.vue'
import AddGoalModal from '@/components/AddGoalModal.vue'

export default {
  components: {HeaderComp, GoalItem, AddGoalModal },
  data() {
    return {
      showModal: false,
      goals: this.loadGoalsFromLocalStorage()
    }
  },
  methods: {
    createNewGoal(newGoal) {
      this.goals.push({
        id: Date.now(),
        title: newGoal.title,
        targetHours: newGoal.targetHours,
        completedHours: 0,
        deadline: newGoal.deadline,
        isTimerRunning: false
      });
      this.showModal = false;
      this.saveGoalsToLocalStorage(); // Сохраняем после создания
    },

    updateGoalProgress({ id, hours }) {
      const goal = this.goals.find(g => g.id === id);
      if (goal) {
        goal.completedHours += hours;
        this.saveGoalsToLocalStorage(); // Сохраняем после обновления
      }
    },

    deleteGoal(goalId) {
      this.goals = this.goals.filter(goal => goal.id !== goalId);
      this.saveGoalsToLocalStorage(); // Сохраняем после удаления
    },

    // Новые методы для работы с LocalStorage
    loadGoalsFromLocalStorage() {
      const saved = localStorage.getItem('userGoals');
      return saved ? JSON.parse(saved) : null;
    },

    saveGoalsToLocalStorage() {
      localStorage.setItem('userGoals', JSON.stringify(this.goals));
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