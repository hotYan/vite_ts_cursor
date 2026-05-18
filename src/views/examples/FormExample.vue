<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'

interface UserForm {
  username: string
  email: string
  password: string
  role: string
  remark: string
}

const formRef = ref<FormInstance>()
const submitLoading = ref(false)

const formState = reactive<UserForm>({
  username: '',
  email: '',
  password: '',
  role: '',
  remark: '',
})

const rules: Record<keyof UserForm, Rule[]> = {
  username: [{ required: true, message: '请输入用户名' }],
  email: [{ required: true, type: 'email', message: '请输入有效邮箱' }],
  password: [{ required: true, message: '请输入密码', min: 6 }],
  role: [{ required: true, message: '请选择角色' }],
  remark: [],
}

const roleOptions = ref([
  { label: '管理员', value: 'admin' },
  { label: '编辑', value: 'editor' },
  { label: '普通用户', value: 'user' },
])

const handleSubmit = async () => {
  await formRef.value!.validateFields()
  submitLoading.value = true
  try {
    // 模拟提交
    await new Promise((resolve) => setTimeout(resolve, 1500))
    message.success('提交成功')
    formRef.value!.resetFields()
  } finally {
    submitLoading.value = false
  }
}

const handleReset = () => {
  formRef.value!.resetFields()
}
</script>

<template>
  <div class="example-page">
    <a-card title="Form 表单示例">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        layout="vertical"
        style="max-width: 500px"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formState.username" placeholder="请输入用户名" allow-clear />
        </a-form-item>

        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formState.email" placeholder="请输入邮箱" allow-clear />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item label="角色" name="role">
          <a-select
            v-model:value="formState.role"
            :options="roleOptions"
            placeholder="请选择角色"
            allow-clear
          />
        </a-form-item>

        <a-form-item label="备注" name="remark">
          <a-textarea
            v-model:value="formState.remark"
            :auto-size="{ minRows: 2, maxRows: 6 }"
            placeholder="请输入备注信息"
          />
        </a-form-item>

        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
              提交
            </a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.example-page {
  padding: 24px;
}
</style>
