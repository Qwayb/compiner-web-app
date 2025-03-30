<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>Создать новую цель</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Название цели:</label>
          <input v-model="title" type="text" required>
        </div>

        <div class="form-group">
          <label>Количество часов:</label>
          <input v-model.number="targetHours" type="number" min="1" required>
        </div>

        <div class="form-group">
          <label>Дедлайн:</label>
          <input v-model="deadline" type="date" required>
        </div>

        <div class="modal-actions">
          <button type="button" @click="close">Отмена</button>
          <button type="submit" :disabled="!isFormValid">Создать цель</button>
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-actions button[type="submit"] {
  background-color: #42b983;
  color: white;
}

.modal-actions button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>