import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProtectedView from '@/views/ProtectedView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/protected',
      name: 'protected',
      component: ProtectedView,
      meta: {
        requiresAuth: true,
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
