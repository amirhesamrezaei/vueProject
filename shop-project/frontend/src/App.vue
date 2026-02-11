<template>
  <div class="topbar">
    <div class="container" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <span class="pill">🛍️ Shop</span>
        <RouterLink class="pill" to="/products">محصولات</RouterLink>
        <RouterLink class="pill" to="/cart">سبد خرید</RouterLink>
      </div>

      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <span v-if="auth.user" class="pill">👤 {{ auth.user.username }}</span>

        <button class="pill btn-ghost" @click="toggleTheme">
          {{ theme === "dark" ? "🌙 دارک" : "☀️ لایت" }}
        </button>

        <RouterLink v-if="!auth.isLoggedIn" class="pill" to="/login">ورود</RouterLink>
        <button v-else class="btn btn-ghost" @click="auth.logout()">خروج</button>
      </div>
    </div>
  </div>

  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "./stores/authStore";

const auth = useAuthStore();
const theme = ref(localStorage.getItem("theme") || "dark");

function applyTheme() {
  document.documentElement.setAttribute("data-theme", theme.value === "dark" ? "dark" : "light");
}

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme.value);
  applyTheme();
}

onMounted(applyTheme);
</script>
