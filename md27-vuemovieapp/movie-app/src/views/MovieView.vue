<template>
  <main>
    <IsLoading v-if="moviesStore.isLoading" />
    <article class="movie-container">
      <div class="movie-image-part">
        <img :src="moviesStore.movie.Poster" class="movie-poster" :alt="moviesStore.movie.Title" />
      </div>
      <div class="movie-middle-part">
        <p>
          {{ moviesStore.movie.Genre }}
        </p>
        <h2 class="movie-title">
          {{ moviesStore.movie.Title }}
        </h2>
        <div class="movie-details-box">
          <div class="icon-detail">
            <CalendarIcon class="icon"/>
            {{ moviesStore.movie.Released }}
          </div>
          <div class="icon-detail">
            <TimeIcon class="icon"/>
            {{ moviesStore.movie.Runtime }}
          </div>
          <div class="icon-detail">
            <LocationIcon class="icon"/>
            {{ moviesStore.movie.Country }}
          </div>
        </div>
        <div class="movie-rating">
          <StarIcon class="icon" />
          {{ moviesStore.movie.imdbRating }} - {{ moviesStore.movie.imdbVotes }} Votes
        </div>
        <p>
          {{ moviesStore.movie.Plot }}
        </p>
        <button
          @click="toggleFav(moviesStore.movie.imdbID, $event)"
          class="button-favorite"
          :class="getClass(moviesStore.movie.imdbID)"
        >
          <HeartIcon class="fav-icon" />
          <span class="fav-button-text">
            {{ handleTextFav(moviesStore.movie.imdbID) }}
          </span>
        </button>
      </div>
      <div class="movie-details-part">
        <div class="detail-row"><span class="detail-name">Genre: </span><span>{{ moviesStore.movie.Genre }}</span></div>
        <div class="detail-row"><span class="detail-name">Director: </span><span>{{ moviesStore.movie.Director }}</span></div>
        <div class="detail-row"><span class="detail-name">Writer: </span><span>{{ moviesStore.movie.Writer }}</span></div>
        <div class="detail-row"><span class="detail-name">Actors: </span><span>{{ moviesStore.movie.Actors }}</span></div>
        <div class="detail-row"><span class="detail-name">Language: </span><span>{{ moviesStore.movie.Language }}</span></div>
        <div class="detail-row"><span class="detail-name">Country: </span><span>{{ moviesStore.movie.Country }}</span></div>
        <div class="detail-row"><span class="detail-name">Awards: </span><span>{{ moviesStore.movie.Awards }}</span></div>
        <div class="detail-row"><span class="detail-name">Rated: </span><span>{{ moviesStore.movie.Rated }}</span></div>
        <div class="detail-row"><span class="detail-name">BoxOffice: </span><span>{{ moviesStore.movie.BoxOffice }}</span></div>
      </div>
    </article>
    <hr class="divider" />
    <div>
      <h3 class="more-movies">Movies from the latest search</h3>
      <Movies :movies="films" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Movies from '../components/Movies.vue'
import IsLoading from '../components/IsLoading.vue'
import { watchEffect, ref, onMounted } from '@vue/runtime-core'
import CalendarIcon from '../components/icons/CalendarIcon.vue'
import TimeIcon from '../components/icons/TimeIcon.vue'
import HeartIcon from '../components/icons/HeartIcon.vue'
import LocationIcon from '../components/icons/LocationIcon.vue'
import StarIcon from '../components/icons/StarIcon.vue'
import { useMoviesStore } from '../store/movies'
import { useFavoritStore } from '../store/favorites'
import type { MovieType } from '@/types'

export default defineComponent({
  name: 'Movie',
  components: { Movies, IsLoading, CalendarIcon, TimeIcon, HeartIcon, LocationIcon, StarIcon },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const movies = ref<MovieType[] | null>(null)
    const favStore = useFavoritStore()
    const moviesStore = useMoviesStore()
    const films = ref<MovieType[]>([])

    watchEffect(() => {
      films.value = moviesStore.movies.filter((movie) => movie.imdbID != props.id)
      moviesStore.getMovieByID(props.id)
    })

    onMounted(() => {
      moviesStore.getMovieByID(props.id)
    })

    const toggleFav = (id: string, e: MouseEvent) => {
      const cek = favStore.favMovies.filter((movie: MovieType) => movie.imdbID == id)
      if (cek.length > 0) {
        favStore.removeFromFav(id)
        if (e.target instanceof HTMLElement) {
          e.target.classList.remove('text-red-600')
        }
      } else {
        favStore.addToFavorit(id)
        if (e.target instanceof HTMLElement) {
          e.target.classList.add('text-red-600')
        }
      }
    }
    const handleTextFav = (imdbID: string) => {
      const cek = favStore.favMovies.filter((movie: MovieType) => movie.imdbID == imdbID)
      return cek.length ? 'Remove from Favorite' : 'Add to Favorite'
    }

    const getClass = (imdbID: string) => {
      const cek = favStore.favMovies.filter((movie: MovieType) => movie.imdbID == imdbID)
      return cek.length ? 'heart-fav' : 'heart-notfav'
    }

    return {
      films,
      toggleFav,
      handleTextFav,
      getClass,
      moviesStore,
      favStore
    }
  }
})
</script>

<style scoped>
@import '@/assets/movie.css';
.more-movies {
  padding-top: 1rem;
  font-size: 1.5rem;
  text-align: center;
}

.divider {
  opacity: 0.6;
}
</style>
