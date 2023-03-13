<template>
  <div class="movie-card">
    <router-link :to="{ name: 'Details', params: { id: movie.imdbID } }">
      <div v-if="movie.Poster != 'N/A'" class="movie-thumbnail">
        <img :src="movie.Poster" class="thumbnail-image" :alt="movie.Title" />
      </div>
      <div v-else class="movie-thumbnail">
        <img src="../assets/no-image.png" class="thumbnail-image" :alt="movie.Title" />
      </div>
    </router-link>

    <div class="movie-info">
      <router-link :to="{ name: 'Details', params: { id: movie.imdbID } }">
        <h3 class="movie-title" :title="movie.Title">
          {{ title }}
        </h3>
      </router-link>
      <div class="movie-year">
      {{ movie.Year }}
    </div>
      <button class="heart-button" @click="toggleFav(movie.imdbID, $event)">
        <HeartIcon :class="{ 'heart-notfav': isFav(movie.imdbID) }" />
      </button>
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CalendarIcon from './icons/CalendarIcon.vue'
import HeartIcon from './icons/HeartIcon.vue'
import { useFavoritStore } from '../store/favorites'
import type { MovieType } from '@/types'

export default defineComponent({
  name: 'Movie',
  components: {
    CalendarIcon,
    HeartIcon
  },
  props: {
    movie: {
      type: Object as () => MovieType,
      required: true
    }
  },
  setup(props) {
    const store = useFavoritStore()
    const title = ref(props.movie.Title.substr(0, 15) + '...')

    const toggleFav = (id: string, e: MouseEvent) => {
      const cek = store.favMovies.filter((movie: MovieType) => movie.imdbID == id)
      if (cek.length > 0) {
        store.removeFromFav(id)
        ;(e.target as Element).classList.remove('heart-fav') // type assertion here
      } else {
        store.addToFavorit(id)
        ;(e.target as Element).classList.add('heart-fav') // type assertion here
      }
    }

    const isFav = (imdbID: string): boolean => {
      if (store.favMovies) {
        const result = store.favMovies.filter((movie: MovieType) => movie.imdbID == imdbID)
        return result.length ? true : false
      }
      return false
    }

    return {
      title,
      toggleFav,
      isFav
    }
  }
})
</script>

<style scoped>
@import '@/assets/movie.css';

.movie-card {
  background-color: #dfdfdf;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.3));
}

.movie-thumbnail {
  width: 100%;
}

.thumbnail-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.heart-button {
  height: 30px;
  width: 30px;
  background: none;
  border:none;
  outline:none;
  cursor: pointer;
}

.heart-button:hover {
 opacity: 0.6;
}

.movie-info {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-year {
  font-size: 1.5rem;
  font-weight: 100;
}
</style>
