<script setup>
import mainScreen from "@/views/MainScreen.vue";
</script>

<template>
  <header>
    <nav>
      <a @click="mainScreen">Цели</a>
      <a href="">User</a>
    </nav>
  </header>
</template>

<style scoped>
  header{
    background-color: #151515;
    height: 104px;
    display: flex;
    align-items: center;
    margin-bottom: 64px;
  }

  nav {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1420px;
  }
</style>