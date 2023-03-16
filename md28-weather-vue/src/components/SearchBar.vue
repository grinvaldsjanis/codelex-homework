<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchTerm"
      @keydown.enter="selectFirstResult"
      @input="onInput"
      placeholder="Search for a location"
    />
    <ul v-if="showResults">
      <li
        v-for="result in searchResults"
        :key="result.name + result.country + result.lat"
        @click="onResultClick(result.lat, result.lon)"
      >
        {{ result.name }}, {{ result.country }}, {{ result.state }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useWeatherStore } from '@/store/store'
import { searchLocations } from '@/utils/weatherAPI'
import type Location from '@/types/Location'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const weatherStore = useWeatherStore()
    const searchTerm = ref(weatherStore.searchTerm)
    const searchResults = ref<Location[]>([])
    const showResults = computed(() => searchResults.value.length > 0)

    const onInput = debounce(async () => {
      if (searchTerm.value === '') {
        searchResults.value = []
      } else {
        try {
          const results = await searchLocations(searchTerm.value)
          searchResults.value = results
        } catch (error) {
          console.error(error)
        }
      }
    }, 500)

    const onResultClick = (latitude: number, longitude: number) => {
      weatherStore.setLocation(latitude, longitude)
      searchResults.value = []
      searchTerm.value = ''
    }

    const selectFirstResult = () => {
      if (showResults.value) {
        const firstResult = searchResults.value[0]
        onResultClick(firstResult.lat, firstResult.lon)
      }
    }

    return {
      searchTerm,
      searchResults,
      showResults,
      onInput,
      onResultClick,
      selectFirstResult
    }
  }
})
</script>

<style scoped>
/* Styles for the SearchBar component */
.search-bar {
  width: 400px;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  position: relative;
}
.search-bar input[type='text'] {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 1rem;
}
.search-bar ul {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
  width: 100%;
  max-height: 200px;
  z-index: 1;
  border: 1px solid #ccc;
  top: 100%;
  left: 0;
}
.search-bar li {
  padding: 0.5rem;
  cursor: pointer;
}
.search-bar li:hover {
  background-color: #ccc;
}
.search-bar button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}
</style>
