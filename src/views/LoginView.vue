<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const login = () => {
  localStorage.setItem('token', 'demo-token')
  const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/protected'
  void router.replace(redirectPath)
}
</script>

<template>
  <main class="home">
    <section class="card">
      <h2>登录页（权限骨架）</h2>
      <p>点击按钮写入本地 token，模拟登录后跳回目标页面。</p>
      <button type="button" @click="login">模拟登录</button>
    </section>
  </main>
</template>

<style scoped>
.home {
  max-width: 760px;
  margin: 40px auto;
  padding: 0 16px;
}

.card {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}
</style>
