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
import Confirm from './utils/Confirm'
import Verify from './utils/Verify'

//全局组件
import Dialog from './components/Dialog.vue'

const app = createApp(App)


app.config.globalProperties.Request=Request
app.config.globalProperties.VueCookies=VueCookies
app.config.globalProperties.Message=Message
app.config.globalProperties.Confirm=Confirm
app.config.globalProperties.Verify=Verify

app.component('Dialog',Dialog)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
