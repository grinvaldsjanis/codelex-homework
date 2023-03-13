<template>
  <div class="app">
    <Header></Header>
    <router-view v-slot="{ Component, route }">
      <transition name ="route.meta.transition || 'fade'">
      <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'

</script>



