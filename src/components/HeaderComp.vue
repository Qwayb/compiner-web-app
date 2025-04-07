<script setup>
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Compiner</router-link>
      <router-link to="/goals">Цели</router-link>
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