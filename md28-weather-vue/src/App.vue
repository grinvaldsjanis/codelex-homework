<template>
  <div id="app">
    <Header></Header>
    <main class="section">
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.section {
  margin-top: 1rem;
}
</style>
