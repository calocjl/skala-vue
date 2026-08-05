<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/practices/assignment/UnitToggler.vue'
</script>

<template>
  <div class="app-wrapper">
    <nav>
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <UnitToggler style="margin-left: auto" />
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.app-wrapper {
  margin: 0 auto;
  padding: 20px;
}
nav {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
}
nav a {
  text-decoration: none;
  color: #6c4ab6;
  font-weight: bold;
}
</style>