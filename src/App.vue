<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/practices/assignment/UnitToggler.vue'
</script>

<template>
  <div class="app-wrapper">
    <div class="nav-bar">
      <nav class="nav-links">
        <RouterLink to="/" class="nav-item">홈</RouterLink>
        <RouterLink to="/about" class="nav-item">About</RouterLink>
        <RouterLink to="/menu" class="nav-item">오늘의 메뉴 추천</RouterLink>
      </nav>
      <UnitToggler class="unit-toggler-position" />
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(160deg, #e9e4fb 0%, #f5f0fc 40%, #e8f7f1 100%);
}
.nav-bar {
  position: relative;
  max-width: 1180px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-links {
  display: flex;
  gap: 8px;
  background: white;
  padding: 8px;
  border-radius: 999px;
  box-shadow: 0 4px 14px rgba(108, 74, 182, 0.1);
}
.nav-item {
  text-decoration: none;
  color: #8a6fc7;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 22px;
  border-radius: 999px;
  transition: all 0.2s;
}
.nav-item:hover {
  background: #f3eefc;
  color: #6c4ab6;
}
.router-link-active {
  background: #6c4ab6 !important;
  color: white !important;
}
.unit-toggler-position {
  position: absolute;
  right: 0;
}
</style>