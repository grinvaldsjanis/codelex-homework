<template>
  <div>
    <h1>Random Jokes</h1>
    <List :items="jokes" :favorites="favorites" @favorite="handleFavorite" />
    <button class="button-reload" @click="loadJokes">Refresh Jokes</button>
  </div>
</template>

<!-- --------------------------------- -->

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import List from '@/components/List.vue'
import { fetchJokes, fetchFavoriteIds, addFavorite, removeFavorite } from '@/api'
import type { JokeType } from '@/types'

export default defineComponent({
  name: 'JokesPage',
  components: { List },
  setup() {
    const jokes = ref<JokeType[]>([])
    const favorites = ref<number[]>([])

    const handleFavorite = async (id: number) => {
      if (favorites.value.length === 0) {
        const jokeToAdd = jokes.value.find((j) => j.id === id)

        if (jokeToAdd) {
          const newFavorite = await addFavorite(jokeToAdd)
          favorites.value.push(newFavorite.id)
        }

      } else {
        const index = favorites.value.indexOf(id)
        if (index === -1) {
          const jokeToAdd = jokes.value.find((j) => j.id === id)

          if (jokeToAdd) {
            const newFavorite = await addFavorite(jokeToAdd)
            favorites.value.push(newFavorite.id)
          }

        } else {
          await removeFavorite(id)
          favorites.value.splice(index, 1)
        }
      }
    }

    const loadJokes = async () => {
      const jokesData = await fetchJokes()
      jokes.value = jokesData
      const favoriteIds = await fetchFavoriteIds()
      favorites.value = favoriteIds || []
    }

    onMounted(() => {
      loadJokes()
    })

    return {
      jokes,
      favorites: computed(() => favorites.value),
      handleFavorite,
      loadJokes
    }
  }
})
</script>

<style scoped>
.button-reload {
  padding: 10px;
  border: none;
  outline: none;
  background-color: #FFD700;
  border-radius: 10px;
  font-size: 1.2rem;
}

.button-reload:hover {
  background-color: #FFE658;
}

</style>
