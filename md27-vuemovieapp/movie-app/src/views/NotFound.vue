<template>
  <div class="container">
    <div class="flex flex-col items-center text-gray-300">
      <h3 class="text-lg">PAGE NOT FOUND</h3>
      <button class="mt-5 px-6 py-2 bg-blue-600 rounded-md" @click="back">Go Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const back = () => {
  router.go(-1)
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
}
</style>
