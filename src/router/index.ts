import { createRouter, createWebHashHistory, RouteRecordName, type RouteRecordRaw } from 'vue-router'
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
  affix?: boolean
  noCache?: boolean
  breadcrumb?: boolean
}

export type CustomerRouteRecordRaw = RouteRecordRaw & {
  name?: RouteRecordName
  hidden?: boolean
  alwaysShow?: boolean
  meta?: CustomerRouteMeta
}

const constantRoutes: CustomerRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [{ path: 'home', name: 'home', meta: { title: '首页' }, component: () => import('@/views/home/index.vue') }],
  },
  {
    path: '/sys',
    name: 'sys',
    meta: { title: '系统管理' },
    component: Layout,
    children: [
      { path: 'user', name: 'user', meta: { title: '用户管理' }, component: () => import('@/views/sys/user/index.vue') },
      { path: 'menu', name: 'menu', meta: { title: '菜单管理' }, component: () => import('@/views/sys/menu/index.vue') },
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
