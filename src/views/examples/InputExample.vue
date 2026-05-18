<script setup lang="ts">
import { reactive } from 'vue'
import { message } from 'ant-design-vue'

const form = reactive({
  username: '',
  password: '',
  age: null as number | null,
  search: '',
  remark: '',
})

const handleSearch = (value: string) => {
  message.info(`搜索: ${value}`)
}
</script>

<template>
  <div class="example-page">
    <a-card title="Input 输入框示例">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :md="12">
          <h4>基础输入框</h4>
          <a-input v-model:value="form.username" placeholder="请输入用户名" allow-clear />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>密码输入框</h4>
          <a-input-password v-model:value="form.password" placeholder="请输入密码" />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>数字输入框</h4>
          <a-input-number
            v-model:value="form.age"
            :min="0"
            :max="150"
            placeholder="请输入年龄"
            style="width: 100%"
          />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>搜索输入框</h4>
          <a-input-search
            v-model:value="form.search"
            placeholder="请输入搜索内容"
            enter-button
            @search="handleSearch"
          />
        </a-col>

        <a-col :span="24">
          <h4>多行文本</h4>
          <a-textarea
            v-model:value="form.remark"
            :auto-size="{ minRows: 2, maxRows: 6 }"
            placeholder="请输入备注信息"
          />
        </a-col>

        <a-col :span="24">
          <h4>前缀/后缀</h4>
          <a-space direction="vertical" style="width: 100%">
            <a-input placeholder="请输入网址" addon-before="https://" addon-after=".com" />
            <a-input placeholder="请输入金额" prefix="¥" suffix="RMB" />
          </a-space>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped>
.example-page {
  padding: 24px;
}
h4 {
  margin: 0 0 8px;
  color: rgba(0, 0, 0, 0.85);
}
</style>
