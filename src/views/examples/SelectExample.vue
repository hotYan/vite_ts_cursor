<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

const form = reactive({
  role: undefined as string | undefined,
  city: undefined as string | undefined,
  tags: [] as string[],
  remoteUser: undefined as string | undefined,
})

const roleOptions = ref([
  { label: '管理员', value: 'admin' },
  { label: '编辑', value: 'editor' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' },
])

const cityOptions = ref([
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
])

const tagOptions = ref([
  { label: '前端', value: 'frontend' },
  { label: '后端', value: 'backend' },
  { label: '设计', value: 'design' },
  { label: '产品', value: 'product' },
  { label: '测试', value: 'testing' },
])

// 远程搜索
const remoteOptions = ref<{ label: string; value: string }[]>([])
const remoteLoading = ref(false)
let searchTimer: ReturnType<typeof setTimeout> | null = null

const handleRemoteSearch = (value: string) => {
  if (searchTimer) clearTimeout(searchTimer)
  if (!value) {
    remoteOptions.value = []
    return
  }
  remoteLoading.value = true
  // 模拟 300ms 防抖远程搜索
  searchTimer = setTimeout(() => {
    remoteOptions.value = [
      { label: `${value} - 用户A`, value: `${value}_a` },
      { label: `${value} - 用户B`, value: `${value}_b` },
      { label: `${value} - 用户C`, value: `${value}_c` },
    ]
    remoteLoading.value = false
  }, 300)
}

const handleChange = (value: string) => {
  message.info(`选择了: ${value}`)
}
</script>

<template>
  <div class="example-page">
    <a-card title="Select 选择器示例">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :md="12">
          <h4>基础选择</h4>
          <a-select
            v-model:value="form.role"
            :options="roleOptions"
            placeholder="请选择角色"
            allow-clear
            style="width: 100%"
            @change="handleChange"
          />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>带搜索</h4>
          <a-select
            v-model:value="form.city"
            :options="cityOptions"
            placeholder="请选择城市"
            show-search
            allow-clear
            style="width: 100%"
          />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>多选（限制标签数）</h4>
          <a-select
            v-model:value="form.tags"
            :options="tagOptions"
            mode="multiple"
            :max-tag-count="2"
            placeholder="请选择标签"
            style="width: 100%"
          />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>远程搜索（300ms 防抖）</h4>
          <a-select
            v-model:value="form.remoteUser"
            :options="remoteOptions"
            :filter-option="false"
            :loading="remoteLoading"
            show-search
            placeholder="搜索用户"
            style="width: 100%"
            @search="handleRemoteSearch"
          />
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
