<template>
  <header class="header">
    <div class="logo-title">
      <LogoIcon class="header-icon-link" />
      <router-link to="/">
        <h1 class="header-title">MOVIES</h1>
      </router-link>
    </div>
    <div class="search-fav">
      <Search />
      <router-link to="/favorites" class="favorite-link">
        <HeartIcon class="header-icon-link" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoIcon from './icons/Logo.vue'
import HeartIcon from './icons/HeartIcon.vue'
import Search from './Search.vue'
</script>

<style>
.logo-title {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.search-fav {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.header-title {
  color: white;
  font-size: 3rem;
}

.header-icon-link {
  fill: gold;
  width: 40px;
  height: 40px;
}

.header {
  display: flex;
  flex-direction: column;
  background-color: rgb(70, 93, 136);
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: 0 0 1rem 1rem;
  margin-bottom: 2rem;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));
}

@media (min-width: 550px) {
  .header {
    flex-direction: row;
    height: 5rem;
  }
}

.header-title {
  font-weight: 700;
}

.favorite-link {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
