---
description: Ant Design Vue 4.x 组件使用规范与最佳实践
inclusion: auto
---

# Ant Design Vue 组件使用规则

本项目使用 ant-design-vue 4.2.6，已全局注册。以下规则约束组件使用的类型安全、响应式设计、无障碍访问和性能优化。

---

## 通用规则

- 组件属性使用 kebab-case 风格（如 `data-source`、`row-key`、`confirm-loading`）。
- 双向绑定统一使用 `v-model:xxx` 语法（如 `v-model:value`、`v-model:open`）。
- 事件监听使用 `@event` 语法，不使用 `:onEvent` 属性绑定。
- 所有组件的类型从 `ant-design-vue/es/xxx` 路径导入，不从根路径导入类型。
- 弹出层组件（Dropdown、Select、DatePicker、Popover）必须设置 `getPopupContainer` 挂载到最近滚动容器，避免定位偏移。

---

## Table 表格

- 列定义必须使用 `ColumnType<T>` 泛型，`dataIndex` 必须为数据类型的合法键。
- 必须设置 `row-key` 属性，值为数据唯一标识字段名。
- 远程数据必须通过 `@change` 事件处理分页、排序、筛选，禁止在模板内直接调用接口。
- 大数据量（>1000 行）必须启用虚拟滚动（`:virtual="true"`）或服务端分页。
- 操作列使用 `fixed: 'right'` 固定在右侧，并设置明确的 `width`。
- 空状态使用 `locale` 属性自定义空文案，不使用默认英文。

```typescript
// ✅ 推荐：强类型列定义
import type { ColumnType } from 'ant-design-vue/es/table'

interface UserInfo {
  id: number
  username: string
  email: string
}

const columns: ColumnType<UserInfo>[] = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '操作', key: 'action', fixed: 'right', width: 120 },
]
```

```html
<!-- ✅ 推荐 -->
<a-table
  :columns="columns"
  :data-source="dataSource"
  :loading="loading"
  :pagination="pagination"
  row-key="id"
  @change="handleTableChange"
/>

<!-- ❌ 禁止：缺少 row-key、未处理 change 事件 -->
<a-table :columns="columns" :data-source="dataSource" />
```

---

## Form 表单

- `:model` 绑定的对象必须通过 `reactive()` 声明。
- `name` 属性必须为 model 对象的合法键，与校验规则 key 一一对应。
- 校验规则使用 `Record<keyof FormState, Rule[]>` 类型约束，确保字段名不拼错。
- 表单提交必须先调用 `validateFields()`，禁止跳过校验直接提交。
- 表单布局统一使用 `layout` 属性（`horizontal` | `vertical` | `inline`），不通过 CSS 覆盖。
- 动态表单项使用 `v-if` 控制，不使用 `v-show`（避免隐藏字段参与校验）。

```typescript
// ✅ 推荐：类型安全的表单
import { reactive, ref } from 'vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'

interface CreateForm {
  name: string
  email: string
  role: string
}

const formRef = ref<FormInstance>()
const formState = reactive<CreateForm>({
  name: '',
  email: '',
  role: '',
})

const rules: Record<keyof CreateForm, Rule[]> = {
  name: [{ required: true, message: '请输入名称' }],
  email: [{ required: true, type: 'email', message: '请输入有效邮箱' }],
  role: [{ required: true, message: '请选择角色' }],
}

// ✅ 提交前必须校验
const handleSubmit = async () => {
  await formRef.value!.validateFields()
  // 提交逻辑...
}
```

```html
<!-- ✅ 推荐：name 与 model 键对应 -->
<a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
  <a-form-item label="名称" name="name">
    <a-input v-model:value="formState.name" placeholder="请输入名称" />
  </a-form-item>
</a-form>

<!-- ❌ 禁止：name 与 model 键不匹配 -->
<a-form-item label="名称" name="userName">
  <a-input v-model:value="formState.name" />
</a-form-item>
```

---

## Modal 对话框

- 必须使用 `v-model:open` 受控模式管理显隐，禁止使用 `visible`（已废弃）。
- 异步操作必须绑定 `:confirm-loading`，防止重复提交。
- 异步操作期间设置 `:mask-closable="false"` 禁止点击遮罩关闭。
- 包含表单或重型内容的 Modal 必须设置 `destroy-on-close`。
- Modal 内表单在关闭时必须重置状态（通过 `destroy-on-close` 或手动 `resetFields`）。
- 确认类操作使用 `Modal.confirm()`，不新建完整 Modal 组件。

```typescript
// ✅ 推荐：受控 Modal + 异步加载
const open = ref(false)
const confirmLoading = ref(false)

const handleOk = async () => {
  confirmLoading.value = true
  try {
    await submitData()
    open.value = false
  } finally {
    confirmLoading.value = false
  }
}
```

```html
<!-- ✅ 推荐 -->
<a-modal
  v-model:open="open"
  title="编辑用户"
  :confirm-loading="confirmLoading"
  :mask-closable="false"
  destroy-on-close
  @ok="handleOk"
>
  <!-- 内容 -->
</a-modal>

<!-- ❌ 禁止：非受控、无 loading -->
<a-modal :visible="show" @ok="submit">
  <!-- 内容 -->
</a-modal>
```

---

## Button 按钮

- 触发异步操作的按钮必须绑定 `:loading` 属性，防止重复点击。
- 主操作使用 `type="primary"`，每个视图区域最多一个 primary 按钮。
- 危险操作使用 `danger` 属性，并配合二次确认（Popconfirm 或 Modal.confirm）。
- 纯图标按钮必须提供 `aria-label` 属性。
- 按钮组使用 `<a-space>` 包裹，不使用 margin 手动间距。

```html
<!-- ✅ 推荐：异步按钮 + loading -->
<a-button type="primary" :loading="submitLoading" @click="handleSubmit"> 提交 </a-button>

<!-- ✅ 推荐：危险操作 + 二次确认 -->
<a-popconfirm title="确定删除？" @confirm="handleDelete">
  <a-button danger>删除</a-button>
</a-popconfirm>

<!-- ✅ 推荐：图标按钮 + 无障碍 -->
<a-button type="text" aria-label="刷新列表" @click="refresh">
  <template #icon><ReloadOutlined /></template>
</a-button>

<!-- ❌ 禁止：图标按钮无 aria-label -->
<a-button type="text" @click="refresh">
  <template #icon><ReloadOutlined /></template>
</a-button>
```

---

## Input 输入框

- 必须设置 `placeholder` 提供输入提示。
- 密码输入使用 `<a-input-password>`，禁止用普通 input 展示密码。
- 搜索场景使用 `<a-input-search>`，配合 `@search` 事件。
- 数字输入使用 `<a-input-number>`，设置 `min`/`max` 约束范围。
- 禁止直接将用户输入渲染为 HTML（防 XSS），使用 `v-text` 或插值表达式。
- 长文本使用 `<a-textarea>`，设置 `:auto-size="{ minRows: 2, maxRows: 6 }"`。

```html
<!-- ✅ 推荐 -->
<a-input v-model:value="form.name" placeholder="请输入用户名" allow-clear />
<a-input-password v-model:value="form.password" placeholder="请输入密码" />
<a-input-number v-model:value="form.age" :min="0" :max="150" placeholder="年龄" />
<a-textarea
  v-model:value="form.remark"
  :auto-size="{ minRows: 2, maxRows: 6 }"
  placeholder="备注"
/>

<!-- ❌ 禁止：无 placeholder -->
<a-input v-model:value="form.name" />
```

---

## Select 选择器

- 必须设置 `placeholder`。
- 选项数据使用 `options` 属性传入，不使用 `<a-select-option>` 子组件（性能更优）。
- 远程搜索使用 `:filter-option="false"` + `@search` + `debounce`（300ms）。
- 多选场景设置 `mode="multiple"` 并限制 `max-tag-count`。
- 选项值类型必须与 model 类型一致（避免 string/number 混淆）。

```typescript
// ✅ 推荐：options 方式
const roleOptions = ref([
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'user' },
])
```

```html
<!-- ✅ 推荐 -->
<a-select v-model:value="form.role" :options="roleOptions" placeholder="请选择角色" allow-clear />

<!-- ✅ 推荐：远程搜索 -->
<a-select
  v-model:value="form.userId"
  :options="userOptions"
  :filter-option="false"
  show-search
  placeholder="搜索用户"
  @search="handleSearch"
/>

<!-- ❌ 禁止：使用子组件方式（大数据量性能差） -->
<a-select v-model:value="form.role">
  <a-select-option v-for="item in list" :key="item.value" :value="item.value">
    {{ item.label }}
  </a-select-option>
</a-select>
```

---

## DatePicker 日期选择器

- 日期值统一使用 `dayjs` 类型，不使用原生 Date 或字符串。
- 提交接口前将 dayjs 转为后端要求的格式（通常 ISO 字符串或时间戳）。
- 范围选择使用 `<a-range-picker>`，不用两个独立 DatePicker。
- 设置 `getPopupContainer` 避免弹出面板定位异常。
- 中文环境下 `locale` 已通过全局 ConfigProvider 设置，无需单独配置。

```typescript
import type { Dayjs } from 'dayjs'

interface QueryForm {
  dateRange: [Dayjs, Dayjs] | null
}

// 提交时转换格式
const params = {
  startDate: form.dateRange?.[0]?.format('YYYY-MM-DD'),
  endDate: form.dateRange?.[1]?.format('YYYY-MM-DD'),
}
```

```html
<!-- ✅ 推荐 -->
<a-range-picker
  v-model:value="form.dateRange"
  :get-popup-container="(trigger) => trigger.parentElement!"
/>

<!-- ❌ 禁止：两个独立 picker 代替 range-picker -->
<a-date-picker v-model:value="form.startDate" />
<a-date-picker v-model:value="form.endDate" />
```

---

## Message / Notification 消息通知

- 操作结果反馈使用 `message`（轻量提示），系统通知使用 `notification`（详细信息）。
- 成功：`message.success()`，失败：`message.error()`，警告：`message.warning()`。
- 禁止混用 message 和 notification 展示同类信息。
- 异步操作使用 `message.loading()` 展示进度，完成后切换为 success/error。
- 错误消息文案统一通过 `getErrorMessage(error)` 获取，不硬编码。

```typescript
import { message } from 'ant-design-vue'
import { getErrorMessage } from '@/utils/errors'

// ✅ 推荐：统一消息反馈
const handleDelete = async () => {
  try {
    await deleteUser(id)
    message.success('删除成功')
  } catch (error) {
    message.error(getErrorMessage(error))
  }
}

// ✅ 推荐：异步进度提示
const handleExport = async () => {
  const hide = message.loading('导出中...', 0)
  try {
    await exportData()
    message.success('导出成功')
  } catch (error) {
    message.error(getErrorMessage(error))
  } finally {
    hide()
  }
}
```

---

## 无障碍访问（A11y）

- 所有表单控件必须关联 `<a-form-item label="xxx">`，或提供 `aria-label`。
- 纯图标按钮必须设置 `aria-label` 描述操作含义。
- Table 必须设置有意义的 `aria-label` 或包裹在带标题的区域中。
- Modal 的 `title` 属性不可为空，作为对话框的无障碍标题。
- 颜色不作为唯一信息传达方式（如状态标签同时使用颜色 + 文字）。

---

## 性能优化

- Table 大数据量启用 `:virtual="true"` 虚拟滚动。
- Select 远程搜索添加 300ms 防抖。
- Modal 重型内容设置 `destroy-on-close` 释放 DOM。
- 图标使用按需导入，不全量引入 `@ant-design/icons-vue`。
- 避免在 `v-for` 中使用内联函数创建事件处理器，提取为方法引用。
- Tabs 内容使用懒加载（`:destroyInactiveTabPane="true"`）减少初始渲染。
