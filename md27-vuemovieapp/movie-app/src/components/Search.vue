<template>
  <form @submit.prevent="handleSearch" class="search-box">
    <input
      type="text"
      placeholder="Search for movies . . . "
      class="search-field"
      v-model="keyword"
      @keydown.enter.prevent="handleSearch"
    />
    <button class="search-button">
      <SearchIcon />
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SearchIcon from './icons/SearchIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'
import { useMoviesStore } from '../store/movies'
import type { Ref } from 'vue'
import router from '@/router'

export default defineComponent({
  name: 'SearchMovies',
  components: {
    SearchIcon,
    CloseIcon
  },
  setup() {
    const store = useMoviesStore()

    const keyword: Ref<string> = ref(localStorage.getItem('keyword') ?? 'One Piece')
    const isRecent: Ref<boolean> = ref(localStorage.getItem('isRecent') == 'true' ? true : false)

    const handleSearch = () => {
      localStorage.setItem('keyword', keyword.value)
      localStorage.setItem('isRecent', 'true')

      router.push({ path: '/' })

      isRecent.value = true
      let searchString = keyword.value.toLowerCase()
      searchString = searchString.trim()

      if (keyword.value) {
        store.getAllMovies(searchString)
      }
    }

    return {
      keyword,
      isRecent,
      handleSearch
    }
  }
})
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 3rem;
}

.search-field {
  padding: 0.5rem;
  border: 2px solid rgb(116, 116, 116);
  border-radius: 1rem;
  line-height: 1rem;
  font-size: 1.2rem;
  transition: width 0.4s ease-in-out;
}

.search-button {
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  outline: none;
  fill: white;
  transition: 0.4s;
  cursor: pointer;
}

.search-button:hover {
  opacity: 0.6;
}

.search-field:focus {
  box-shadow: inset;
}

.close-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
