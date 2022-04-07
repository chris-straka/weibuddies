import { createRouter, createWebHistory } from "vue-router";
import ProductsPage from "./pages/ProductsPage/ProductsPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: ProductsPage }],
});

export default router;
