import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import App from './App.vue'
import router from '@/router'

const app = createApp(App)

// 1. 引入组件
import SimpleBar from 'simplebar-vue'
// 2. 引入必需的 CSS 样式
import 'simplebar-vue/dist/simplebar.min.css'
// 3. 全局注册组件
app.component('SimpleBar', SimpleBar)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
