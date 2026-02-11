<template>
  <div class="grid">
    <div class="col-12 card" style="padding:18px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap;">
        <div>
          <h1 class="h1">سبد خرید</h1>
          <div class="muted" style="margin-top:6px;line-height:1.7;">
            تعداد رو تغییر بده یا آیتم رو حذف کن؛ جمع کل خودکار حساب می‌شه.
          </div>
        </div>
        <span class="badge">API: /api/cart</span>
      </div>
    </div>

    <div class="col-12" v-if="loading">
      <div class="card" style="padding:18px;">در حال بارگذاری...</div>
    </div>

    <div class="col-12" v-else-if="error">
      <div class="toast danger">❗ {{ error }}</div>
    </div>

    <template v-else>
      <div class="col-8" v-if="cart.items.length">
        <div class="grid">
          <div class="col-12 card" v-for="it in cart.items" :key="it.id" style="overflow:hidden;">
            <div style="display:flex;gap:12px;align-items:stretch;">
              <img
                :src="imgFor(it.product.id)"
                alt="product"
                style="width:160px;min-width:160px;height:140px;object-fit:cover;display:block;"
              />
              <div style="padding:14px;flex:1;display:flex;flex-direction:column;gap:10px;">
                <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                  <b>{{ it.product.title }}</b>
                  <span class="badge">💰 {{ format(it.product.price) }}</span>
                </div>

                <div class="muted" style="line-height:1.6;">
                  {{ it.product.description || "بدون توضیح" }}
                </div>

                <div style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;">
                  <div style="display:flex;gap:10px;align-items:center;">
                    <span class="muted">تعداد:</span>
                    <input class="input" style="width:100px;" type="number" min="1"
                           :value="it.quantity" @change="chgQty(it, $event)" />
                  </div>

                  <div style="display:flex;gap:10px;align-items:center;">
                    <span class="badge">جمع آیتم: {{ format(it.product.price * it.quantity) }}</span>
                    <button class="btn btn-ghost" @click="remove(it)" style="border-color: rgba(255,77,109,.35);">
                      🗑️ حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-8" v-else>
        <div class="card" style="padding:18px;">سبد خالی است.</div>
      </div>

      <div class="col-4">
        <div class="card" style="padding:18px;display:flex;flex-direction:column;gap:12px;">
          <h2 class="h2">خلاصه خرید</h2>
          <div class="sep"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="muted">تعداد آیتم‌ها</span>
            <span class="badge">{{ cart.items.length }}</span>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="muted">جمع کل</span>
            <b>{{ format(cart.total) }}</b>
          </div>

          <button class="btn" :disabled="cart.items.length===0" @click="fakeCheckout">
            پرداخت (نمایشی)
          </button>

          <div v-if="msg" class="toast success">✅ {{ msg }}</div>
          <div class="muted" style="font-size:13px;line-height:1.7;">
            این دکمه برای ارائه پروژه است (Checkout واقعی جداست).
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getCart, removeCartItem, updateCartItem } from "../api/cart";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const auth = useAuthStore();

const cart = ref({ items: [], total: 0 });
const loading = ref(true);
const error = ref("");
const msg = ref("");

function format(n){
  return new Intl.NumberFormat("fa-IR").format(n) + " تومان";
}
function imgFor(id){
  return `https://picsum.photos/seed/cart_${id}/700/500`;
}

async function load(){
  loading.value = true;
  error.value = "";
  try{
    const res = await getCart();
    cart.value = res.data;
  } catch(e){
    if (e?.response?.status === 401) router.push("/login");
    else error.value = e?.response?.data?.message || "خطا در دریافت سبد";
  } finally{
    loading.value = false;
  }
}

onMounted(() => {
  if (!auth.isLoggedIn) return router.push("/login");
  load();
});

async function remove(it){
  msg.value = "";
  try{
    await removeCartItem(it.id);
    await load();
  } catch {
    error.value = "خطا در حذف آیتم";
  }
}

async function chgQty(it, ev){
  msg.value = "";
  const qty = Math.max(1, Number(ev.target.value || 1));
  try{
    await updateCartItem(it.id, qty);
    await load();
  } catch {
    error.value = "خطا در تغییر تعداد";
  }
}

function fakeCheckout(){
  msg.value = "پرداخت نمایشی انجام شد 😄";
}
</script>
