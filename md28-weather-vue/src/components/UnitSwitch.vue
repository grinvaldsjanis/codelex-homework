<template>
  <div class="unit-switch">
    <button :class="{ active: computedUnits === 'metric' }" @click="changeUnits('metric')">
      &deg;C
    </button>
    <button :class="{ active: computedUnits === 'imperial' }" @click="changeUnits('imperial')">
      &deg;F
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useWeatherStore } from '@/store/store';

export default defineComponent({
  name: 'UnitSwitch',
  setup() {
    const weatherStore = useWeatherStore();

    const changeUnits = (newUnits: string) => {
      weatherStore.setUnits(newUnits);
    };

    // Use a computed property to get the units value from the store
    const computedUnits = computed(() => weatherStore.units);

    return {
      computedUnits,
      changeUnits,
    };
  },
});
</script>

<style scoped>
/* Styles for the UnitSwitch component */
.unit-switch {
  display: flex;
  gap: 1rem;
}

.unit-switch button {
  border: none;
  background-color: transparent;
  color: #C7C7C7;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: 0.4s;
}

.unit-switch button.active {
  color: #3f9fc5;
}
</style>
