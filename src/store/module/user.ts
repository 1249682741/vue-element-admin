import { defineStore } from 'pinia'
import { useBaseInfoStore } from './base-info'
import { useTagsViewStore } from './tags-view'
import { fetchMenuRoutes } from '@/api/auth'
import { ResponseCode } from '@/constant'
import { ElMessage } from 'element-plus'
import { createRoute, handleUserMenuData } from '@/utils/menu'
import router from '@/router'

type UserStore = {
  userInfo: LoginRespose | null
  isGetMenuData: boolean
  buttons: string[]
  routes: CustomRouteRecordRaw[]
}

export const useUserStore = defineStore('user', {
  state(): UserStore {
    return {
      userInfo: null,
      isGetMenuData: false,
      buttons: [],
      routes: [],
    }
  },
  getters: {
    token: (state) => state.userInfo?.token ?? '',
    schoolId: (state) => state.userInfo?.user?.schoolId ?? '',
    userName: (state) => state.userInfo?.user?.userName ?? '',
    userType: (state) => state.userInfo?.user?.userType ?? '',
    topDept: (state) => {
      let { deptIds } = state.userInfo?.user ?? { deptIds: [] }
      return deptIds.length > 0 ? deptIds[0] : ''
    },
    auth: (state) => {
      // @ts-ignore
      let auth = state.buttons.reduce((obj, item) => ((obj[item] = true), obj), {})
      return auth
    },
  },
  actions: {
    setUserInfo(data: LoginRespose | null) {
      this.userInfo = data
    },
    async getMenuRoutes() {
      try {
        const result = await fetchMenuRoutes()
        if (result.code == ResponseCode.OK) {
          this.isGetMenuData = true
          let { buttons, routes } = handleUserMenuData(result.data)
          routes.forEach((route) => router.addRoute(route))
          this.routes = routes
          this.buttons = buttons
          return Promise.resolve()
        } else {
          ElMessage.error({ message: result.msg })
          return Promise.reject(result.msg)
        }
      } catch (err) {
        console.log('getMenuRoutes err', err)
        return Promise.resolve(err)
      }
    },
    clear() {
      this.setUserInfo(null)
      this.isGetMenuData = false
      this.routes = []
    },
    logout() {
      const baseInfoStore = useBaseInfoStore()
      baseInfoStore.clear()
      const tagsViewState = useTagsViewStore()
      tagsViewState.clear()
      this.clear()
      sessionStorage.clear()
      localStorage.clear()
    },
  },
  persist: {
    paths: ['userInfo'],
    // afterRestore(ctx) {
    //   console.log(`${ctx.store.$id} afterRestore call`, ctx.store.$state.routes)
    //   ctx.store.$state.routes.forEach((route: CustomRouteRecordRaw) => router.addRoute(route))
    // },
  },
})
