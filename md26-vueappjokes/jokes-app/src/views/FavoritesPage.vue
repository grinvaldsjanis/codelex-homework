<template>
  <div>
    <h1>Favorites List</h1>
    <List :items="jokes" :favorites="favorites" @favorite="handleFavorite" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import List from '@/components/List.vue'
import { fetchFavorites, removeFavorite } from '@/api'
import type { JokeType } from '@/types'
import { computed } from '@vue/reactivity'

export default defineComponent({
  name: 'FavoritesPage',
  components: { List },
  setup() {
    const jokes = ref<JokeType[]>([])
    const favorites = ref<number[]>([])

    const handleFavorite = async (id: number) => {
      await removeFavorite(id)
      favorites.value = favorites.value.filter((favId) => favId !== id)
      jokes.value = jokes.value.filter((joke) => joke.id !== id)
    }

    const loadFavorites = async () => {
      jokes.value = await fetchFavorites()
      favorites.value = jokes.value.map((joke) => joke.id)
    }

    onMounted(() => {
      loadFavorites()
    })

    return {
      jokes,
      favorites: computed(() => favorites.value),
      handleFavorite
    }
  }
})
</script>
