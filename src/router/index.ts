import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import JokeDiscoveryView from "../views/JokeDiscoveryView.vue";
import FavoritesView from "@/views/FavoritesView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "JokeDiscovery",
    component: JokeDiscoveryView,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
