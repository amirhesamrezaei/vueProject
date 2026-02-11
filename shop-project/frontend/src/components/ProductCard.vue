<template>
  <div class="card" style="display:flex;flex-direction:column;">
    <div style="position:relative;">
      <img
        :src="imgUrl"
        alt="product"
        style="width:100%;height:180px;object-fit:cover;display:block;"
        loading="lazy"
      />
      <div style="position:absolute;inset:auto 12px 12px auto;">
        <span class="badge">💰 {{ format(product.price) }}</span>
      </div>
    </div>

    <div style="padding:14px;display:flex;flex-direction:column;gap:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
        <div style="font-weight:800;">{{ product.title }}</div>
        <span class="badge">#{{ product.id }}</span>
      </div>

      <div class="muted" style="min-height:44px;line-height:1.6;">
        {{ product.description || "بدون توضیح" }}
      </div>

      <div class="sep"></div>

      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
        <span class="muted">موجودی: {{ product.stock }}</span>
        <RouterLink class="btn btn-ghost" :to="`/products/${product.id}`">جزئیات</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ product: Object });

const imgUrl = computed(() => {
  // عکس‌های آزاد Unsplash — با seed ثابت برای هر محصول
  const seed = props.product?.id || 1;
  return `https://picsum.photos/seed/shop_${seed}/900/600`;
});

function format(n){
  return new Intl.NumberFormat("fa-IR").format(n) + " تومان";
}

import { computed } from "vue";
</script>
