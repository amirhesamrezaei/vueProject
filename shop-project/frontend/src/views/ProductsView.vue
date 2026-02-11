<template>
  <div class="grid">
    <div class="col-12 card" style="padding:18px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap;">
        <div>
          <h1 class="h1">محصولات</h1>
          <div class="muted" style="margin-top:6px;line-height:1.7;">
            بهترین‌ها رو انتخاب کن؛ جزئیات و افزودن به سبد داخل هر محصول.
          </div>
        </div>
        <span class="badge">API: /api/products</span>
      </div>
    </div>

    <div class="col-12" v-if="loading">
      <div class="card" style="padding:18px;">در حال بارگذاری...</div>
    </div>

    <div class="col-12" v-else-if="error">
      <div class="toast danger">❗ {{ error }}</div>
    </div>

    <div class="col-12" v-else>
      <div class="grid">
        <div class="col-4" v-for="p in products" :key="p.id">
          <ProductCard :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard.vue";

const products = ref([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const res = await getProducts();
    products.value = res.data;
  } catch (e) {
    error.value = e?.response?.data?.message || "خطا در دریافت محصولات";
  } finally {
    loading.value = false;
  }
});
</script>
