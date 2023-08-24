import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import persist from 'pinia-plugin-persistedstate'
const app = createApp(App)
app.use(createPinia().use(persist))
app.use(router)
// 样式全局使⽤
import 'vant/lib/index.css'
import './styles/main.scss'

app.mount('#app')
