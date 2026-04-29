<script setup lang="ts">
import ApiStatusCard from '@/components/ApiStatusCard.vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <main class="home">
    <h1>Vite + Vue3 + TypeScript 基础架构</h1>
    <section class="card">
      <h3>路由权限骨架</h3>
      <p>
        <RouterLink to="/protected">进入受保护页面</RouterLink>
        （未登录会跳转到登录页）
      </p>
    </section>
    <section class="card">
      <h3>Pinia 示例</h3>
      <p>count: {{ counterStore.count }}</p>
      <p>doubleCount: {{ counterStore.doubleCount }}</p>
      <button type="button" @click="counterStore.increment">+1</button>
    </section>

    <ApiStatusCard />
  </main>
</template>

<style scoped>
.home {
  max-width: 760px;
  margin: 40px auto;
  padding: 0 16px;
  display: grid;
  gap: 16px;
}

.card {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}
</style>
