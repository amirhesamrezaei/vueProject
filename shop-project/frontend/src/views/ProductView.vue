<template>
  <div class="grid">
    <div class="col-12" style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
      <button class="pill btn-ghost" @click="$router.back()">← برگشت</button>
      <span class="badge">API: /api/products/:id</span>
    </div>

    <div class="col-12" v-if="loading">
      <div class="card" style="padding:18px;">در حال بارگذاری...</div>
    </div>

    <div class="col-12" v-else-if="error">
      <div class="toast danger">❗ {{ error }}</div>
    </div>

    <template v-else>
      <div class="col-8 card">
        <img :src="imgUrl" alt="product" style="width:100%;height:360px;object-fit:cover;display:block;" />
        <div style="padding:18px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;">
            <div>
              <h1 class="h1">{{ product.title }}</h1>
              <div class="muted" style="margin-top:8px;line-height:1.8;">
                {{ product.description || "بدون توضیح" }}
              </div>
            </div>
            <span class="badge">#{{ product.id }}</span>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="card" style="padding:18px;display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="muted">قیمت</span>
            <b>{{ format(product.price) }}</b>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="muted">موجودی</span>
            <span class="badge">{{ product.stock }}</span>
          </div>

          <div class="sep"></div>

          <div style="display:flex;gap:10px;align-items:center;">
            <input class="input" style="width:110px;" type="number" min="1" v-model.number="qty" />
            <button class="btn" :disabled="adding" @click="add">
              {{ adding ? "در حال افزودن..." : "افزودن به سبد" }}
            </button>
          </div>

          <div v-if="msg" class="toast success">✅ {{ msg }}</div>
          <div class="muted" style="font-size:13px;line-height:1.7;">
            برای سبد خرید باید وارد شده باشی.
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct } from "../api/products";
import { addToCart } from "../api/cart";
import { useAuthStore } from "../stores/authStore";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const product = ref(null);
const loading = ref(true);
const error = ref("");
const qty = ref(1);

const adding = ref(false);
const msg = ref("");

const imgUrl = computed(() => {
  const seed = Number(route.params.id) || 1;
  return `https://picsum.photos/seed/shop_detail_${seed}/1200/800`;
});

function format(n){
  return new Intl.NumberFormat("fa-IR").format(n) + " تومان";
}

onMounted(async () => {
  try {
    const res = await getProduct(route.params.id);
    product.value = res.data;
  } catch (e) {
    error.value = e?.response?.data?.message || "خطا در دریافت محصول";
  } finally {
    loading.value = false;
  }
});

async function add(){
  msg.value = "";
  if (!auth.isLoggedIn) return router.push("/login");

  adding.value = true;
  try{
    await addToCart(product.value.id, qty.value);
    msg.value = "به سبد اضافه شد";
    router.push("/cart");
  } catch(e){
    error.value = e?.response?.data?.message || "خطا در افزودن به سبد";
  } finally{
    adding.value = false;
  }
}
</script>
