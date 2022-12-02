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
  affix?: boolean
  noCache?: boolean
  breadcrumb?: boolean
}

export type CustomerRouteRecordRaw = RouteRecordRaw & {
  name?: string
  hidden?: boolean
  alwaysShow?: boolean
  meta?: CustomerRouteMeta
}

const constantRoutes: CustomerRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    meta: { title: 'aaaa' },
    alwaysShow: true,
    redirect: '/b',
    children: [
      {
        path: 'a',
        name: 'a',
        meta: { title: '哇哈哈' },
        component: Login,
      },
    ],
  },
  {
    path: '/b',
    name: 'b',
    meta: { title: 'bbbb' },
    component: Layout,
    children: [
      {
        path: 'b-1',
        name: 'b-1',
        meta: { title: 'b-哈哈哈1' },
        component: Login,
      },
      {
        path: 'b-2',
        name: 'b-2',
        meta: { title: 'b-哈哈哈2' },
        component: Login,
      },
    ],
  },
  {
    path: '/c',
    name: 'c',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'cccc' },
    children: [
      {
        path: 'c-1',
        name: 'c-1',
        meta: { title: 'c--1' },
        component: Login,
        children: [
          {
            path: 'b1',
            name: 'c-1-b1',
            meta: { title: '啊啊啊1' },
            component: Login,
          },
          {
            path: 'b2',
            name: 'c-1-b2',
            meta: { title: '啊啊啊2' },
            component: Login,
          },
        ],
      },
    ],
  },
  {
    path: '/d',
    name: 'd',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'dd' },
    children: [
      {
        path: 'd-1',
        name: 'd-1',
        meta: { title: 'd--1' },
        component: Login,
        children: [
          {
            path: 'd1',
            name: 'd-1-b1',
            meta: { title: '呜呜呜1' },
            component: Login,
          },
          {
            path: 'd2',
            name: 'd-1-b2',
            meta: { title: '呜呜呜2' },
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
