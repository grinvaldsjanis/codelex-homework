<template>
  <main>
    <h3 class="favorite-title">Your Favorite Movies</h3>
    <Movies :movies="store.favMovies" />
    <IsLoading v-if="moviesStore.isLoading" />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core'
import Movies from '@/components/Movies.vue'
import IsLoading from '@/components/IsLoading.vue'
import { useFavoritStore } from '@/store/favorites'
import { useMoviesStore } from '@/store/movies'
const store = useFavoritStore()
const moviesStore = useMoviesStore()

onMounted(() => {
  if (store.favMovies.length < 1) {
    moviesStore.isLoading = true
    moviesStore.loadingMessage = 'Empty'
  }
})
</script>

<style scoped>
@import '@/assets/movie.css';
.favorite-title {
  font-size: 1.5rem;
  text-align: center;
}
</style>

