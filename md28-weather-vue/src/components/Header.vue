<template>
    <header class="header">
      <div class="logo-title">
        <img class="header-logo" src="@/assets/logo.png">
        <h1 class="header__title">WindSock</h1>
      </div>
      <SearchBar></SearchBar>
      <UnitSwitch></UnitSwitch>
    </header>
</template>
  

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from './SearchBar.vue';
import UnitSwitch from './UnitSwitch.vue';

export default defineComponent({
  name: 'Header',
  components: {
    SearchBar,
    UnitSwitch,
  },
});
</script>

<style scoped>
/* Styles for the Header component */
.header {
  display: flex;
  direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 1rem 0 2rem 0;
  margin: 0 0 0 0;
  border-bottom: 2px solid rgb(216, 216, 216);
}

.logo-title {
  display: flex;
  gap: 1rem;
}

.header-logo {
  height: 3rem;
  width: 3rem;
}

.header__title {
  color: rgb(83, 139, 204);
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
</style>
