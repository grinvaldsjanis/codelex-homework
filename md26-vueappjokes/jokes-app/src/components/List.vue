<template>
  <div>
    <ul class="list">
      <ListItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :favorites="favorites"
        :on-favorite="toggleFavorite"
      ></ListItem>
    </ul>
  </div>
</template>

<!-- --------------------------------- -->

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { JokeType } from '@/types'
import ListItem from './ListItem.vue'

export default defineComponent({
  name: 'List',
  props: {
    items: {
      type: Array as PropType<JokeType[]>,
      required: true
    },
    favorites: {
      type: Array as PropType<number[]>,
      default: () => []
    },
    isFavoriteList: {
      type: Boolean,
      default: false
    }
  },

  components: {
    ListItem
  },

  methods: {
    toggleFavorite(id: number) {
      this.$emit('favorite', id)
    }
  }
})
</script>

<style scoped>
.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.item-categories {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.joke-text {
  margin-bottom: 10px;
  font-weight: bold;
}

.joke-delivery-text {
  margin-top: 10px;
}

.button-favorite {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-weight: bold;
  font-size: 14px;
}

.button-favorite:hover {
  color: #f6b93b;
}

.font-awesome-icon {
  margin-right: 5px;
}
</style>

