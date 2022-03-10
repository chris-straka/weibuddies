import { createRouter, createWebHistory } from "vue-router";
import HomeVue from "./pages/Home/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: HomeVue }],
});

export default router;
