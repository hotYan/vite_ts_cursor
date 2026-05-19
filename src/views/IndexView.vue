<script setup lang="ts">
import ApiStatusCard from '@/components/ApiStatusCard.vue'
import { useCounterStore } from '@/stores/counter'
import { getSalt } from '@/apis/system'

const counterStore = useCounterStore()

async function handleLogout() {
  // await logout()
  sessionStorage.removeItem('token')
  window.location.reload()
}

async function handleGetSalt() {
  const salt = await getSalt('admin')
  console.log(salt)
}
</script>

<template>
  <div class="index-page">
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :md="12">
        <a-card title="路由权限骨架">
          <p>
            <RouterLink to="/protected">进入受保护页面</RouterLink>
            （未登录会跳转到登录页）
          </p>
          <a-button type="primary" danger @click="handleGetSalt">获取盐</a-button>
          <a-button type="primary" danger @click="handleLogout">退出登录</a-button>
        </a-card>
      </a-col>

      <a-col :xs="24" :md="12">
        <a-card title="Pinia 示例">
          <p>count: {{ counterStore.count }}</p>
          <p>doubleCount: {{ counterStore.doubleCount }}</p>
          <a-button type="primary" @click="counterStore.increment">+1</a-button>
        </a-card>
      </a-col>

      <a-col :span="24">
        <ApiStatusCard />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.index-page {
  padding: 24px;
}
</style>
