import { createRouter, createWebHistory } from "vue-router";
import HomePageVue from "./pages/HomePage/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: HomePageVue }],
});

export default router;
