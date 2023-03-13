import { createRouter, createWebHistory, type RouteMeta } from "vue-router";

interface CustomRouteMeta extends RouteMeta {
  enterClass?: string;
  leaveClass?: string;
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { transition: 'slide-right' },
  },
  {
    path: "/detail/:id",
    name: "Details",
    component: () => import("../views/MovieView.vue"),
    props: true,
    meta: { transition: 'slide-right' },
  },
  {
    path: "/favorites",
    name: "Fav",
    component: () => import("../views/Favorite.vue"),
    meta: { transition: 'slide-right' },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: { transition: 'slide-right' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
