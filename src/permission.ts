import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import router from './router'
import { useUserStore } from '@/store'

const whiteList = ['login']
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    if (whiteList.includes(to?.name as string)) {
      next()
      return
    }
    const userStore = useUserStore()
    if (!userStore.token) {
      next('login')
      return
    }
    // 若没生成过菜单就根据当前角色生成菜单
    if (!userStore.isGetMenuData) {
      await userStore.getMenuRoutes()
      next({ ...to, replace: true })
      return
    }
    next()
  } catch (err) {
    console.log(err)
  }
})
