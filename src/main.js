import './assets/base.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/icon/iconfont.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//全局方法
import Request from './utils/Request'
import VueCookies from 'vue-cookies'
import Message from './utils/Message'
const app = createApp(App)


app.config.globalProperties.Request=Request
app.config.globalProperties.VueCookies=VueCookies
app.config.globalProperties.Message=Message

app.use(router)
app.use(ElementPlus)
app.mount('#app')
