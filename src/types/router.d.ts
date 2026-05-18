import 'vue-router'
import type { FunctionalComponent } from 'vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    guestOnly?: boolean
    title?: string
    icon?: FunctionalComponent
    hidden?: boolean
  }
}
