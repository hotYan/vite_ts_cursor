<script setup lang="ts">
import { reactive } from 'vue'
import type { Dayjs } from 'dayjs'

interface DateForm {
  singleDate: Dayjs | null
  dateRange: [Dayjs, Dayjs] | null
  month: Dayjs | null
  year: Dayjs | null
}

const form = reactive<DateForm>({
  singleDate: null,
  dateRange: null,
  month: null,
  year: null,
})

// 提交时转换格式示例
const getSubmitParams = () => {
  return {
    date: form.singleDate?.format('YYYY-MM-DD'),
    startDate: form.dateRange?.[0]?.format('YYYY-MM-DD'),
    endDate: form.dateRange?.[1]?.format('YYYY-MM-DD'),
    month: form.month?.format('YYYY-MM'),
    year: form.year?.format('YYYY'),
  }
}
</script>

<template>
  <div class="example-page">
    <a-card title="DatePicker 日期选择器示例">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :md="12">
          <h4>日期选择</h4>
          <a-date-picker
            v-model:value="form.singleDate"
            placeholder="请选择日期"
            style="width: 100%"
            :get-popup-container="(trigger: HTMLElement) => trigger.parentElement!"
          />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>日期范围</h4>
          <a-range-picker
            v-model:value="form.dateRange"
            style="width: 100%"
            :get-popup-container="(trigger: HTMLElement) => trigger.parentElement!"
          />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>月份选择</h4>
          <a-date-picker
            v-model:value="form.month"
            picker="month"
            placeholder="请选择月份"
            style="width: 100%"
            :get-popup-container="(trigger: HTMLElement) => trigger.parentElement!"
          />
        </a-col>

        <a-col :xs="24" :md="12">
          <h4>年份选择</h4>
          <a-date-picker
            v-model:value="form.year"
            picker="year"
            placeholder="请选择年份"
            style="width: 100%"
            :get-popup-container="(trigger: HTMLElement) => trigger.parentElement!"
          />
        </a-col>
      </a-row>

      <a-divider />

      <h4>提交参数预览</h4>
      <pre class="params-preview">{{ JSON.stringify(getSubmitParams(), null, 2) }}</pre>
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
.params-preview {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 6px;
  font-size: 13px;
  overflow-x: auto;
}
</style>
