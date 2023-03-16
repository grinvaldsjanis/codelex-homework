<template>
  <main>
    <article class="article" ref="scrollComponent">
      <Movies :movies="store.movies" />
    </article>
    <IsLoading v-if="store.isLoading" />
  </main>
</template>

<script lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import Movies from '@/components/Movies.vue'
import IsLoading from '@/components/IsLoading.vue'
import { useMoviesStore } from '@/store/movies'
import type { MovieType } from '@/types'

export default {
  name: 'Home',
  components: { Movies, IsLoading },
  setup() {
    const store = useMoviesStore()
    const keyword: Ref<string> = ref((localStorage.getItem('keyword') ?? 'One Piece') as string)
    const scrollComponent: Ref<HTMLDivElement | null> = ref(null)
    const favMovies: Ref<MovieType[]> = ref(
      localStorage.getItem('favMovies')
        ? JSON.parse(localStorage.getItem('favMovies') as string)
        : []
    )

    let totalPage: number = 0

    setTimeout(() => {
      totalPage = Math.ceil(store.totalResults / 10)
    }, 1000)

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      store.getAllMovies(keyword.value)
    })

    const handleScroll = (e: Event) => {
      const element = scrollComponent.value
      if (element) {
        if (element.getBoundingClientRect().bottom < window.innerHeight) {
          store.page++
          if (store.page <= totalPage) {
            store.nextPage(store.page)
          }
        }
      }
    }

    return {
      store,
      keyword,
      scrollComponent,
      favMovies,
      totalPage,
      handleScroll
    }
  }
}
</script>

<style scoped></style>
