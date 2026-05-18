<script setup lang="ts">
import { ref } from 'vue'
import { message, notification } from 'ant-design-vue'

const exportLoading = ref(false)

const showSuccess = () => {
  message.success('操作成功')
}

const showError = () => {
  message.error('操作失败，请稍后重试')
}

const showWarning = () => {
  message.warning('请注意，此操作有风险')
}

const showInfo = () => {
  message.info('这是一条提示信息')
}

// 异步进度提示
const handleExport = async () => {
  exportLoading.value = true
  const hide = message.loading('导出中...', 0)
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    message.success('导出成功')
  } catch {
    message.error('导出失败')
  } finally {
    hide()
    exportLoading.value = false
  }
}

// Notification 系统通知
const showNotificationSuccess = () => {
  notification.success({
    message: '审批通过',
    description: '您提交的请假申请已通过审批，请注意查看。',
  })
}

const showNotificationError = () => {
  notification.error({
    message: '系统异常',
    description: '服务器连接超时，请检查网络后重试。如问题持续，请联系管理员。',
    duration: 0,
  })
}

const showNotificationInfo = () => {
  notification.info({
    message: '系统更新',
    description: '系统将于今晚 22:00 进行维护升级，预计持续 30 分钟。',
  })
}
</script>

<template>
  <div class="example-page">
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card title="Message 轻量提示">
          <p class="hint">适用于操作结果反馈，自动消失，不打断用户操作。</p>
          <a-space wrap>
            <a-button type="primary" @click="showSuccess">成功</a-button>
            <a-button danger @click="showError">失败</a-button>
            <a-button @click="showWarning">警告</a-button>
            <a-button @click="showInfo">提示</a-button>
            <a-button :loading="exportLoading" @click="handleExport">
              异步进度（导出）
            </a-button>
          </a-space>
        </a-card>
      </a-col>

      <a-col :span="24">
        <a-card title="Notification 系统通知">
          <p class="hint">适用于系统级通知，包含标题和详细描述，需要用户主动关闭或等待较长时间。</p>
          <a-space wrap>
            <a-button type="primary" @click="showNotificationSuccess">审批通知</a-button>
            <a-button danger @click="showNotificationError">异常通知（不自动关闭）</a-button>
            <a-button @click="showNotificationInfo">系统通知</a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.example-page {
  padding: 24px;
}
.hint {
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 16px;
}
</style>
