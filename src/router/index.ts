import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Login from '@/views/login/index.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'el-icon-x'            the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
  }
 */

export type CustomerRouteMeta = {
  title?: string
  icon?: string
}

export type CustomerRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
  alwaysShow?: boolean
  meta?: CustomerRouteMeta
}

const constantRoutes: CustomerRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    meta: { title: 'aaaa' },
    children: [
      {
        path: 'a',
        meta: { title: 'a' },
        component: Login,
      },
    ],
  },
  {
    path: '/b',
    meta: { title: 'bbbb' },
    component: Layout,
    children: [
      {
        path: 'b-1',
        meta: { title: 'b-1' },
        component: Login,
      },
      {
        path: 'b-2',
        meta: { title: 'b-2' },
        component: Login,
      },
    ],
  },
  {
    path: '/c',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'cccc' },
    children: [
      {
        path: 'c',
        meta: { title: 'c-1' },
        component: Login,
        children: [
          {
            path: 'b-2',
            meta: { title: 'b-2' },
            component: Login,
          },
          {
            path: 'b-2',
            meta: { title: 'b-2' },
            component: Login,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes],
})

export default router
