import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import './styles/main.scss'
import 'virtual:svg-icons-register'
const app = createApp(App)
// 2. 引入组件样式
import 'vant/lib/index.css'
app.use(pinia)
app.use(router)
app.mount('#app')
