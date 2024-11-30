import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import JokeDiscoveryView from "../views/JokeDiscoveryView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "JokeDiscovery",
    component: JokeDiscoveryView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
