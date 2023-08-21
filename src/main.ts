import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import router from './router'
// import 'element-plus/theme-chalk/el-message.css'
// import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import './style/index.scss'
import { CustomForm, Pagination } from '@/components'
import './permission'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

function useComponent(app: any) {
  app.component(CustomForm)
  app.component(Pagination)
}

function usePlugin(app: any, window: any) {
  // elementPlus
  for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
    if (key.indexOf('input') > -1 || key.indexOf('con') > -1) {
      console.log(key)
    }
    if (key == 'Menu') {
      key = 'IconMenu'
    }
    app.component(key, component)
  }

  // vue-router
  app.use(router)

  // pinia
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}

const app = createApp(App)
usePlugin(app, window)
useComponent(app)
app.mount('#app')
