<template>
  <li class="list-item">
    <div class="joke-box">
      <div class="item-categories">
        <p>{{ item.category }}</p>
        <p>{{ item.type }}</p>
      </div>

      <p v-if="isSingleJoke" class="joke-text">{{ item.joke }}</p>
      <p v-if="isTwoPartJoke" class="joke-text">{{ item.setup }}</p>
      <p v-if="isTwoPartJoke" class="joke-text joke-delivery-text">- {{ item.delivery }}</p>
    </div>

    <button v-if="onFavorite" @click="handleFavorite" class="button-favorite">
      <font-awesome-icon class="icon" icon="fa-solid fa-star" v-if="isFavorite"></font-awesome-icon>
      <font-awesome-icon
        class="icon"
        icon="fa-regular fa-star"
        v-if="!isFavorite"
      ></font-awesome-icon>
      {{ isFavorite ? 'Remove' : 'Add' }}
    </button>
  </li>
</template>

<!-- --------------------------------- -->

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { JokeType } from '@/types'

export default defineComponent({
  name: 'ListItem',
  props: {
    item: {
      type: Object as () => JokeType,
      required: true
    },

    favorites: {
      type: Array as () => number[],
      default: () => []
    },

    onFavorite: {
      type: Function as () => Function,
      required: true,
      validator: (value: Function) => typeof value === 'function'
    },
    tooltipText: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const isFavorite = computed(() => props.favorites.includes(props.item.id))

    const handleFavorite = (): void => {
      props.onFavorite(props.item.id)
    }

    const tooltipText = computed(() => {
      return isFavorite.value ? 'Remove from Favorites' : 'Add to Favorites'
    })

    const isSingleJoke = computed(() => props.item.type === 'single')
    const isTwoPartJoke = computed(() => props.item.type === 'twopart')

    const jokeContent = computed(() => {
      if (isSingleJoke.value) {
        return props.item.joke
      } else if (isTwoPartJoke.value) {
        return `${props.item.setup} ${props.item.delivery}`
      }
    })

    return {
      isFavorite,
      handleFavorite,
      isSingleJoke,
      isTwoPartJoke,
      jokeContent,
      item: props.item // added for debugging purposes
    }
  }
})
</script>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 5px;

}

.item-categories {
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 1rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: 0.7rem;
}

.joke-text {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.joke-delivery-text {
  margin-left: 1rem;
  color: rgb(202, 0, 0);
}

.button-favorite {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-weight: bold;
  font-size: 14px;
  width: 5rem;
}

.button-favorite:hover {
  color: #f6b93b;
}

.icon {
  color: #FFD700;
  margin-right: 5px;
  font-size: 2rem;
}
</style>
