<script setup lang="ts">
import { ref } from 'vue'
import { getSystemHealth } from '@/apis/system'
import { getErrorMessage } from '@/utils/errors'

const loading = ref(false)
const statusText = ref('未检查')

const checkHealth = async () => {
  loading.value = true
  try {
    const result = await getSystemHealth()
    statusText.value = result.status
  } catch (error) {
    statusText.value = getErrorMessage(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="card">
    <h3>API 示例</h3>
    <p>当前状态: {{ statusText }}</p>
    <button type="button" :disabled="loading" @click="checkHealth">
      {{ loading ? '检测中...' : '检查后端健康状态' }}
    </button>
  </div>
</template>

<style scoped>
.card {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}

button {
  margin-top: 8px;
}
</style>
