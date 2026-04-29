<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const logout = () => {
  localStorage.removeItem('token')
  void router.replace('/login')
}
</script>

<template>
  <main class="home">
    <section class="card">
      <h2>受保护页面</h2>
      <p>你已通过路由守卫访问到需要登录的页面。</p>
      <button type="button" @click="logout">退出登录</button>
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
