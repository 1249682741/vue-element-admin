import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import './style/index.scss'
import Pagination from '@/components/pagination/index.vue'

function useComponent(app: any) {
  app.component(Pagination)
}

function usePlugin(app: any) {
  // elementPlus
  for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
    if (key == 'Menu') {
      key = 'IconMenu'
    }
    app.component(key, component)
  }

  // pinia
  const pinia = createPinia()
  pinia.use(piniaPersist)
  app.use(pinia)

  // vue-router
  app.use(router)
}

const app = createApp(App)
usePlugin(app)
useComponent(app)
app.mount('#app')
