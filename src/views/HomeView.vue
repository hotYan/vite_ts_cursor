<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { ItemType } from 'ant-design-vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import SimpleBar from 'simplebar-vue'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)

const sideStyle = {
  background:
    'linear-gradient(351.8deg, rgba(220, 236, 251, 0) 60.52%, #dcecfb 96.85%),linear-gradient(0deg, #fafbfd, #fafbfd)',
}

// 根据路由自动生成菜单项
function generateMenuItems(routes: readonly RouteRecordRaw[]): ItemType[] {
  return routes
    .filter((route) => !route.meta?.hidden)
    .map((route) => {
      const item: ItemType = {
        key: route.name as string,
        label: route.meta?.title || (route.name as string),
        icon: route.meta?.icon ? () => h(route.meta!.icon!) : undefined,
      }

      if (route.children && route.children.length > 0) {
        const visibleChildren = route.children.filter((child) => !child.meta?.hidden)
        if (visibleChildren.length > 0) {
          ;(item as ItemType & { children: ItemType[] }).children =
            generateMenuItems(visibleChildren)
        }
      }

      return item
    })
}

const menuItems = computed(() => {
  // 从根路由 '/' 的 children 生成菜单
  const rootRoute = router.options.routes.find((r) => r.path === '/')
  return rootRoute?.children ? generateMenuItems(rootRoute.children) : []
})

// 当前选中的菜单 key
const selectedKeys = computed(() => {
  const name = route.name as string
  return name ? [name] : []
})

// 展开的子菜单 key
const openKeys = ref<string[]>(['examples'])

const handleMenuClick = ({ key }: { key: string }) => {
  const target = router.getRoutes().find((r) => r.name === key)
  if (target) {
    router.push({ name: key })
  }
}
</script>

<template>
  <a-layout class="layout-container">
    <!-- 左侧侧边栏 -->
    <a-layout-sider :style="sideStyle" :collapsed="collapsed" :trigger="null">
      <div class="logo_warp">
        <span v-if="!collapsed">Vite App</span>
        <span v-else>V</span>
      </div>
      <SimpleBar class="menu_height" :scrollbar-max-size="100">
        <a-menu
          v-model:selected-keys="selectedKeys"
          v-model:open-keys="openKeys"
          class="menu_warp"
          :items="menuItems"
          mode="inline"
          @click="handleMenuClick"
        ></a-menu>
      </SimpleBar>
    </a-layout-sider>

    <!-- 右侧：上中下布局 -->
    <a-layout>
      <!-- Header -->
      <a-layout-header class="layout-header">
        <a-button
          type="text"
          class="trigger-btn"
          :aria-label="collapsed ? '展开菜单' : '收起菜单'"
          @click="collapsed = !collapsed"
        >
          <template #icon>
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
          </template>
        </a-button>
        <span class="header-title">Vite + Vue3 + TypeScript 基础架构</span>
      </a-layout-header>

      <!-- Content -->
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>

      <!-- Footer -->
      <a-layout-footer class="layout-footer">
        Vite App ©{{ new Date().getFullYear() }} Created with Ant Design Vue
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo_warp {
  height: 32px;
  width: 100%;
  height: var(--logo-height);
  color: #1f2021;
  font-family: SF Pro;
  font-weight: 590;
  font-style: Semibold;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu_height {
  width: 100%;
  max-height: calc(100vh - var(--logo-height));
}

.menu_warp {
  /* width: 192px; */
  background-color: transparent;
  max-height: calc(100vh - var(--logo-height));
  padding: 0 0 0 0px;
  color: #4e5969;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 14px;
}

.header_warp {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
  align-items: center;
  height: var(--header-top-height);
  padding: 0 10px;
}

.layout-container {
  min-height: 100vh;
}

.logo {
  height: 32px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* color: #fff; */
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
}

.layout-header {
  background: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.trigger-btn {
  font-size: 18px;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
}

.layout-content {
  /* margin: 16px;
  padding: 24px;
  background: #f5f5f5;
  border-radius: 8px; */
}

.layout-footer {
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
}
</style>
<style>
.menu_warp.ant-menu .ant-menu-submenu-title .ant-menu-item-icon + span,
.menu_warp.ant-menu .ant-menu-item .anticon + span,
.menu_warp.ant-menu .ant-menu-submenu-title .anticon + span {
  margin-inline-start: 0px;
}

.menu_warp.ant-menu-light.ant-menu-root.ant-menu-inline,
.menu_warp.ant-menu-light.ant-menu-root.ant-menu-vertical {
  border-inline-end: 0px solid rgba(5, 5, 5, 0.06);
}

.ant-menu-vertical.ant-menu-sub .ant-menu-item {
  margin-left: 4px !important;
}

.menu_warp.ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline {
  background: transparent;
}

.menu_warp.ant-menu-light:not(.ant-menu-horizontal) .ant-menu-submenu-title:hover,
.menu_warp.ant-menu-light:not(.ant-menu-horizontal)
  .ant-menu-item:not(.ant-menu-item-selected):hover {
  background-color: var(--menu-hover-bg);
  color: var(--menu-hover-color);
  font-weight: var(--menu-hover-font-weight);
}

.menu_warp.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected,
.menu_warp.ant-menu-light .ant-menu-item-selected {
  background-color: var(--menu-selected-bg);
  color: var(--menu-selected-color);
  font-weight: var(--menu-hover-font-weight);
}

:root {
  --bg-color: #ffff;
  --active-bg: rgba(240, 243, 251, 1);
  --radius: 10px;
  --hover-bg: #dee1e6;
}

.tabs_warp .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
  border: 0;
}

.tabs_warp .ant-tabs-card.ant-tabs-small > .ant-tabs-nav .ant-tabs-tab {
  padding: 6px 24px;
}

.tabs_warp .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab {
  margin-left: 4px;
}

/* 下边框颜色 */
.tabs_warp .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active {
  border-bottom-color: var(--active-bg);
}

/* 重写选中tab的背景颜色 */
.tabs_warp .ant-tabs .ant-tabs-tab:hover,
.tabs_warp .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active {
  background: var(--active-bg);
}

/* 左侧反向圆角 */
.tabs_warp .ant-tabs .ant-tabs-tab:hover::before,
.tabs_warp .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: calc(var(--radius) * -1);
  width: var(--radius);
  height: var(--radius);
  /* 关键：通过径向渐变切出一个圆弧，颜色与背景一致，背景透明 */
  background: radial-gradient(
    circle at 0 0,
    transparent var(--radius),
    var(--active-bg) var(--radius)
  );
}

/* 右侧反向圆角 */
.tabs_warp .ant-tabs .ant-tabs-tab:hover::after,
.tabs_warp .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: calc(var(--radius) * -1);
  width: var(--radius);
  height: var(--radius);
  background: radial-gradient(
    circle at 100% 0,
    transparent var(--radius),
    var(--active-bg) var(--radius)
  );
}
</style>
