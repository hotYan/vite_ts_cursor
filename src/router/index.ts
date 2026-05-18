import { createRouter, createWebHistory } from 'vue-router'
import {
  HomeOutlined,
  TableOutlined,
  FormOutlined,
  AppstoreOutlined,
  BorderOutlined,
  EditOutlined,
  SelectOutlined,
  CalendarOutlined,
  MessageOutlined,
} from '@ant-design/icons-vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProtectedView from '@/views/ProtectedView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'home-index',
          component: () => import('@/views/IndexView.vue'),
          meta: { title: '首页', icon: HomeOutlined },
        },
        // Ant Design Vue 组件示例路由
        {
          path: 'examples',
          name: 'examples',
          redirect: '/examples/table',
          meta: { title: '组件示例', icon: AppstoreOutlined },
          children: [
            {
              path: 'table',
              name: 'example-table',
              component: () => import('@/views/examples/TableExample.vue'),
              meta: { title: 'Table 表格', icon: TableOutlined },
            },
            {
              path: 'form',
              name: 'example-form',
              component: () => import('@/views/examples/FormExample.vue'),
              meta: { title: 'Form 表单', icon: FormOutlined },
            },
            {
              path: 'modal',
              name: 'example-modal',
              component: () => import('@/views/examples/ModalExample.vue'),
              meta: { title: 'Modal 对话框', icon: AppstoreOutlined },
            },
            {
              path: 'button',
              name: 'example-button',
              component: () => import('@/views/examples/ButtonExample.vue'),
              meta: { title: 'Button 按钮', icon: BorderOutlined },
            },
            {
              path: 'input',
              name: 'example-input',
              component: () => import('@/views/examples/InputExample.vue'),
              meta: { title: 'Input 输入框', icon: EditOutlined },
            },
            {
              path: 'select',
              name: 'example-select',
              component: () => import('@/views/examples/SelectExample.vue'),
              meta: { title: 'Select 选择器', icon: SelectOutlined },
            },
            {
              path: 'datepicker',
              name: 'example-datepicker',
              component: () => import('@/views/examples/DatePickerExample.vue'),
              meta: { title: 'DatePicker 日期', icon: CalendarOutlined },
            },
            {
              path: 'message',
              name: 'example-message',
              component: () => import('@/views/examples/MessageExample.vue'),
              meta: { title: 'Message 消息', icon: MessageOutlined },
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guestOnly: true,
        hidden: true,
      },
    },
    {
      path: '/protected',
      name: 'protected',
      component: ProtectedView,
      meta: {
        requiresAuth: true,
        hidden: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
  if (to.meta.guestOnly && token) {
    return { path: '/protected' }
  }
  return true
})

export default router
