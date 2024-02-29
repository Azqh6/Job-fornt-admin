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
import PermissionCode from './utils/PermissionCode'
//全局组件
import Dialog from './components/Dialog.vue'
import Table from './components/Table.vue'
import Cover from './components/Cover.vue'
import CoverUpload from './components/CoverUpload.vue'
import CategorySelect from './components/content/CategorySelect.vue'
import SuneEditor from './components/Suneditor.vue'

const app = createApp(App)


app.config.globalProperties.Request=Request
app.config.globalProperties.VueCookies=VueCookies
app.config.globalProperties.Message=Message
app.config.globalProperties.Confirm=Confirm
app.config.globalProperties.Verify=Verify
app.config.globalProperties.PermissionCode=PermissionCode
app.config.globalProperties.globalInfo = {
    avatarUrl: "/api/file/getAvatar/",
    imageUrl: "/api/file/getImage/"
}

//自定义指令
app.directive('has',{
    mounted(el,binding){
        let userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
        let permissionCodeList=userInfo.permissionCodeList
        permissionCodeList= permissionCodeList==undefined?[]:permissionCodeList
        if(!permissionCodeList.includes(binding.value)){
            el.parentNode.removeChild(el)
        }
    }
})

app.component('Dialog',Dialog)
app.component('Table',Table)
app.component('Cover',Cover)
app.component('CoverUpload',CoverUpload)
app.component('CategorySelect',CategorySelect)
app.component('SuneEditor',SuneEditor)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
