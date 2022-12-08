import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import router from './router'

const whiteList = ['login']
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (whiteList.includes(to?.name as string)) {
    next()
    return
  }
  next()
})
