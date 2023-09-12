import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import myaxios from './api/myaxios'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


/* 挂载全局对象 */

app.config.globalProperties.$axios = myaxios;

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
