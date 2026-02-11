import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductView from "../views/ProductView.vue";
import CartView from "../views/CartView.vue";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/products" },
    { path: "/login", component: LoginView },
    { path: "/products", component: ProductsView },
    { path: "/products/:id", component: ProductView, props: true },
    { path: "/cart", component: CartView },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.path === "/cart" && !auth.isLoggedIn) return "/login";
});

export default router;
