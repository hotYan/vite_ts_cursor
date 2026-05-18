<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  SearchOutlined,
  DownloadOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue'

const submitLoading = ref(false)
const downloadLoading = ref(false)

const handleSubmit = async () => {
  submitLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    message.success('提交成功')
  } finally {
    submitLoading.value = false
  }
}

const handleDownload = async () => {
  downloadLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    message.success('下载完成')
  } finally {
    downloadLoading.value = false
  }
}

const handleDelete = () => {
  message.success('删除成功')
}

const handleRefresh = () => {
  message.info('已刷新')
}
</script>

<template>
  <div class="example-page">
    <a-card title="Button 按钮示例">
      <h4>基础按钮</h4>
      <a-space wrap>
        <a-button type="primary">主按钮</a-button>
        <a-button>默认按钮</a-button>
        <a-button type="dashed">虚线按钮</a-button>
        <a-button type="text">文本按钮</a-button>
        <a-button type="link">链接按钮</a-button>
      </a-space>

      <a-divider />

      <h4>异步操作按钮（带 loading）</h4>
      <a-space wrap>
        <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
          <template #icon><SearchOutlined /></template>
          提交
        </a-button>
        <a-button :loading="downloadLoading" @click="handleDownload">
          <template #icon><DownloadOutlined /></template>
          下载
        </a-button>
      </a-space>

      <a-divider />

      <h4>危险操作（带二次确认）</h4>
      <a-space wrap>
        <a-popconfirm title="确定删除此记录？" ok-text="确定" cancel-text="取消" @confirm="handleDelete">
          <a-button danger>
            <template #icon><DeleteOutlined /></template>
            删除
          </a-button>
        </a-popconfirm>
      </a-space>

      <a-divider />

      <h4>图标按钮（带 aria-label）</h4>
      <a-space wrap>
        <a-button type="text" aria-label="刷新列表" @click="handleRefresh">
          <template #icon><ReloadOutlined /></template>
        </a-button>
        <a-button type="primary" shape="circle" aria-label="新增记录">
          <template #icon><PlusOutlined /></template>
        </a-button>
        <a-button type="primary" shape="round" aria-label="搜索">
          <template #icon><SearchOutlined /></template>
          搜索
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<style scoped>
.example-page {
  padding: 24px;
}
h4 {
  margin: 8px 0 12px;
  color: rgba(0, 0, 0, 0.85);
}
</style>
