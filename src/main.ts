import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import './style/index.scss'

const app = createApp(App)
for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
  if (key == 'Menu') {
    key = 'IconMenu'
  }
  app.component(key, component)
}
app.use(router)
app.use(createPinia())
app.mount('#app')
