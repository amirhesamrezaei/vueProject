<template>
  <div class="grid" style="min-height: calc(100vh - 92px); align-items:center;">
    <div class="col-12" style="display:flex;justify-content:center;">
      <div class="card" style="width: min(520px, 100%);">
        <div style="padding:20px 18px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
            <div>
              <h1 class="h1">ورود به حساب</h1>
              <div class="muted" style="margin-top:6px;line-height:1.8;">
                برای دسترسی به سبد خرید و افزودن محصول، وارد شو.
              </div>
            </div>
            <span class="badge">API: /api/auth/login</span>
          </div>

          <div class="sep" style="margin:14px 0;"></div>

          <div class="toast" style="margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">
              <div class="muted">اکانت تستی</div>
              <div>
                <span class="badge">username: <b>hadi</b></span>
                <span class="badge" style="margin-right:8px;">password: <b>123456</b></span>
              </div>
            </div>
          </div>

          <form @submit.prevent="submit" style="display:grid;gap:12px;">
            <div>
              <label class="muted" style="display:block;margin-bottom:6px;">نام کاربری</label>
              <input class="input" v-model.trim="username" placeholder="مثلاً hadi" autocomplete="username" />
            </div>

            <div>
              <label class="muted" style="display:block;margin-bottom:6px;">رمز عبور</label>
              <input class="input" v-model="password" type="password" placeholder="••••••" autocomplete="current-password" />
            </div>

            <button class="btn" :disabled="loading || !username || !password">
              {{ loading ? "در حال ورود..." : "ورود" }}
            </button>

            <button class="btn btn-ghost" type="button" @click="fillDemo">
              پر کردن اطلاعات تستی
            </button>

            <div v-if="error" class="toast danger">
              ❗ {{ error }}
            </div>

            <div v-if="success" class="toast success">
              ✅ {{ success }}
            </div>

            <div class="muted" style="font-size:13px;line-height:1.8;">
              نکته: اگر بعد از ورود به سبد رفتی و دوباره خارج شدی، باید دوباره لاگین کنی.
            </div>
          </form>
        </div>

        <div style="padding:14px 18px; border-top: 1px solid var(--border); background: var(--panel2);">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
            <span class="muted">پیشنهاد مسیر تست</span>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <RouterLink class="pill" to="/products">رفتن به محصولات</RouterLink>
              <RouterLink class="pill" to="/cart">رفتن به سبد</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- little footer note -->
    <div class="col-12 muted" style="text-align:center;margin-top:12px;font-size:12px;">
      ساخته شده با Vue + Pinia + Axios — RTL + Dark/Light ✅
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const auth = useAuthStore();

const username = ref("");
const password = ref("");

const loading = ref(false);
const error = ref("");
const success = ref("");

function fillDemo() {
  username.value = "hadi";
  password.value = "123456";
  error.value = "";
  success.value = "";
}

async function submit() {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    await auth.login(username.value, password.value);
    success.value = "ورود موفق بود. انتقال به محصولات...";
    setTimeout(() => router.push("/products"), 450);
  } catch (e) {
    error.value = e?.response?.data?.message || "ورود ناموفق بود";
  } finally {
    loading.value = false;
  }
}
</script>
