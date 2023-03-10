<template>
  <div class="header-container">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <nav class="navigation">
        <RouterLink class="nav-item nav-link" to="/" active-class="active"
          >10 Random Jokes</RouterLink
        >
        <RouterLink class="nav-item nav-link" to="/favorites" active-class="active"
          >Favorite Jokes</RouterLink
        >
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import List from '@/components/List.vue'
import { fetchJokes, fetchFavoriteIds, addFavorite, removeFavorite } from '@/api'
import type { JokeType } from '@/types'

export default defineComponent({
  name: 'Header'
})
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navigation {
  display: flex;
  justify-content: space-between;
}

.nav-item {
  font-size: 20px;
  text-decoration: none;
  padding: 10px;
  margin: 0 10px;
}

.nav-item:hover:not(.active) {
  color: var(--color-border)
}

.nav-item.active {
  border-bottom: 2px solid #333;
}
</style>
