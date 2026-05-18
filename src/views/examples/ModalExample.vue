<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message, Modal } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'

interface EditForm {
  name: string
  email: string
}

const open = ref(false)
const confirmLoading = ref(false)
const formRef = ref<FormInstance>()

const formState = reactive<EditForm>({
  name: '',
  email: '',
})

const rules: Record<keyof EditForm, Rule[]> = {
  name: [{ required: true, message: '请输入名称' }],
  email: [{ required: true, type: 'email', message: '请输入有效邮箱' }],
}

const showModal = () => {
  open.value = true
}

const handleOk = async () => {
  await formRef.value!.validateFields()
  confirmLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    message.success('保存成功')
    open.value = false
  } finally {
    confirmLoading.value = false
  }
}

const handleCancel = () => {
  if (!confirmLoading.value) {
    open.value = false
  }
}

const showConfirm = () => {
  Modal.confirm({
    title: '确认操作',
    content: '确定要执行此操作吗？此操作不可撤销。',
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      message.success('操作成功')
    },
  })
}
</script>

<template>
  <div class="example-page">
    <a-card title="Modal 对话框示例">
      <a-space>
        <a-button type="primary" @click="showModal">打开表单弹窗</a-button>
        <a-button @click="showConfirm">确认对话框</a-button>
      </a-space>

      <a-modal
        v-model:open="open"
        title="编辑信息"
        :confirm-loading="confirmLoading"
        :mask-closable="false"
        destroy-on-close
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
          <a-form-item label="名称" name="name">
            <a-input v-model:value="formState.name" placeholder="请输入名称" />
          </a-form-item>
          <a-form-item label="邮箱" name="email">
            <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<style scoped>
.example-page {
  padding: 24px;
}
</style>
