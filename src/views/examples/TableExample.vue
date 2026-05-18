<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnType } from 'ant-design-vue/es/table'

interface UserRecord {
  id: number
  name: string
  age: number
  email: string
  role: string
}

const columns: ColumnType<UserRecord>[] = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age', sorter: true },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'role', key: 'role' },
  { title: '操作', key: 'action', fixed: 'right', width: 150 },
]

const loading = ref(false)
const dataSource = ref<UserRecord[]>([
  { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', age: 32, email: 'lisi@example.com', role: '编辑' },
  { id: 3, name: '王五', age: 25, email: 'wangwu@example.com', role: '普通用户' },
  { id: 4, name: '赵六', age: 30, email: 'zhaoliu@example.com', role: '编辑' },
  { id: 5, name: '孙七', age: 27, email: 'sunqi@example.com', role: '普通用户' },
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 5,
})

const handleTableChange = (pag: { current: number; pageSize: number }) => {
  pagination.value.current = pag.current
  pagination.value.pageSize = pag.pageSize
}

const handleRefresh = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="example-page">
    <a-card title="Table 表格示例">
      <template #extra>
        <a-button type="primary" @click="handleRefresh">刷新数据</a-button>
      </template>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">编辑</a-button>
              <a-popconfirm title="确定删除？">
                <a-button type="link" size="small" danger>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped>
.example-page {
  padding: 24px;
}
</style>
