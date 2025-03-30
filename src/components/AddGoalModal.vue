<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>Добавить цель</h2>

      <form @submit.prevent="handleSubmit">
        <div class="add-goal-form-inputs">
          <div class="form-group">
            <label></label>
            <input v-model="title" type="text" placeholder="Название цели" required>
          </div>

          <div class="form-group">
            <label></label>
            <input v-model.number="targetHours" type="number" min="1" placeholder="Часы" required>
          </div>

          <div class="form-group">
            <label></label>
            <input v-model="deadline" type="date" placeholder="Дата" required>
          </div>
        </div>

        <div class="modal-actions">
          <button class="white-button" type="submit" :disabled="!isFormValid">Добавить</button>
          <button class="underline-button" type="button" @click="close">отмена</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      targetHours: 1,
      deadline: ''
    }
  },
  computed: {
    isFormValid() {
      return this.title.trim() && this.targetHours > 0 && this.deadline
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    handleSubmit() {
      if (this.isFormValid) {
        this.$emit('create-goal', {
          title: this.title,
          targetHours: this.targetHours,
          deadline: this.deadline
        })
        this.title = ''
        this.targetHours = 1
        this.deadline = ''
      }
    }
  }
}
</script>

<style>

.add-goal-form-inputs{
  margin-bottom: 16px;
}

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

.modal {
  background: #151515;
  padding: 30px;
  border-radius: 15px;
  width: 460px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button[type="submit"] {
  color: #dadada 0,5;
}

.modal-actions button[type="submit"]:disabled {
  cursor: not-allowed;
}
</style>