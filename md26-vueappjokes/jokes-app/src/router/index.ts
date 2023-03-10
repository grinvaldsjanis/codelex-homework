import { createRouter, createWebHistory } from 'vue-router'
import JokesPage from '@/views/JokesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Random Jokes',
      component: JokesPage
    },
    {
      path: '/favorites',
      name: 'favorites',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/FavoritesPage.vue')
    }
  ]
})

export default router
