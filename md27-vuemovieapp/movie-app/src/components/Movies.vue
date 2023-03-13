<template>
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.imdbID" :movie="movie">
      <Movie :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { MovieType } from '@/types'
import Movie from '@/components/Movie.vue'

export default defineComponent({
  name: 'Movies',
  components: {
    Movie
  },
  props: {
    movies: {
      type: Array as PropType<MovieType[]>,
      required: true
    }
  }
})

</script>

<style scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  margin-top: 2rem;
   justify-items: center;
  gap: 1rem;
}
</style>