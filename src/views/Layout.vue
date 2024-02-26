 <template>
  <div class="layout">
    <div class="header">
        <div class="logo">EasyJob管理平台</div>
        <div class="userinfo">
            欢迎回来，
            <el-dropdown>
                <span class="name">{{ userInfo.userName }}</span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="updateMyPwd">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="logOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <div class="body">
        <div class="left-sider">
            <div class="menu-list">
                <div v-for="item in userInfo.menuList"
                 :class="['menu-item',currentPmenu.menuUrl == item.menuUrl ? 'active':'']"
                 @click="pMenuClickHandler(item)"
                 >
                    <div :class="['iconfont','icon-'+item.icon]"></div>
                    <div class="menu-name">{{ item.menuName }}</div>
                </div>
            </div>
            <div class="menu-sub-list">
                <div
                 :class="['sub-menu',currentSubMenu.menuUrl == sub.menuUrl ? 'active':'']"
                 v-for="sub in currentPmenu.children"
                >
                    {{ sub.menuName }}
                </div>
            </div>
        </div>
        <div class="main-content">
            <div class="tag-content">
                <el-tabs
                    type="border-card"
                    v-model="currentSubMenu.menuUrl"
                    @tab-click="tabClick"
                    @edit="editTab"
                    >
                    <el-tab-pane
                        :name="item.menuUrl"
                        :label="item.menuName"
                        :closable="tabList.length>1"
                        v-for="item in tabList"
                        >
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
    <updatePwd ref="updatePwdRef"></updatePwd>
  </div>
</template>

<script setup>
import updatePwd from "./updatePwd.vue"
import { ref, reactive, getCurrentInstance, nextTick,onMounted } from "vue"
const { proxy } = getCurrentInstance();
import { useRouter , useRoute} from 'vue-router';
const router = useRouter();
const route = useRoute();
const userInfo = ref(JSON.parse(sessionStorage.getItem('userInfo')) || {menuList:[]})
const currentPmenu = ref({})
const currentSubMenu=ref({children:[]})
//菜单点击事件
const pMenuClickHandler=(data)=>{
    currentPmenu.value=data
    let firstSubMenu=data.children[0]
    jump(firstSubMenu)
}
//点击菜单实现跳转  item点击的路由
const jump=(item)=>{
    if(currentSubMenu.value.menuUrl==item.menuUrl){
        return
    }
    currentSubMenu.value=item
    addTabHander(item)
    router.push(item.menuUrl)
}
//菜单map
const menuMap=ref({})
const initMenuMap=()=>{
    const menuList=userInfo.value.menuList
    for(let p=0;p<menuList.length;p++){
        menuMap.value[menuList[p].menuUrl]=menuList[p]
        if(menuList[p].children && menuList[p].children.length>0){
            for(let s=0;s<menuList[p].children.length;s++){
               const sub=menuList[p].children[s]
               sub["parentPath"]=menuList[p].menuUrl
               menuMap.value[sub.menuUrl]=sub
            }
        }
    }
}
// 管理父子菜单选中高亮  curPath当前路径
const menuSelect=(curPath,addTab)=>{
    let curMenu=menuMap.value[curPath]
    if(curMenu==null){
        return
    }
    currentPmenu.value=menuMap.value[curMenu.parentPath]
    currentSubMenu.value=curMenu
}

//tab操作
const tabList=ref([])
const addTabHander=(curMenu)=>{
    let currentTab=tabList.value.find(item=>{
        return item.menuUrl==currentSubMenu.value.menuUrl
    })
    if(!currentTab){
        tabList.value.push(curMenu)
    }
}
const tabClick=(e)=>{
    menuSelect(e.props.name,false)
    router.push(e.props.name)
}

const editTab=(targetKey,action)=>{
    if(action !== 'remove'){
        return
    }
    let curPath=currentSubMenu.value.menuUrl
    let tabs=tabList.value
    if(targetKey == curPath){
        tabs.forEach((tab,index)=>{
            if(tab.menuUrl===targetKey){
                let nextTab=tabs[index+1] || tabs[index-1]
                if(nextTab){
                    curPath=nextTab.menuUrl
                }
            }
        })
    }
    tabList.value=tabs.filter(tab=>tab.menuUrl!==targetKey)
    if(curPath !== currentSubMenu.value.menuUrl){
        router.push(curPath) 
        menuSelect(curPath)
    }
}

onMounted(()=>{
    initMenuMap()
    console.log(menuMap.value);
    menuSelect(route.path,true)
})
//修改密码
const updatePwdRef=ref()
const updateMyPwd=()=>{
    updatePwdRef.value.show()
}
//退出
const logOut=()=>{
    proxy.Confirm('确定要退出登录吗',async()=>{
        let result=await proxy.Request({
            url:'/logout',
        })
        sessionStorage.removeItem('userInfo')
         router.push('/login')
    })
}
</script>

<style lang="scss" scoped>
.layout{
    .header{
        border-bottom: 1px solid #ddd;
        height: 60px;
        padding-right: 24px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo{
            font-weight: bold;
            margin-left: 5px;
            font-size: 25px;
            color: #05a1f5;
        }
        .userinfo{
            margin-right: 20px;
            font-size: 14px;
            display: flex;
            align-items: center;
            .name{
                font-size: 1;
                color: #409eff;
                cursor: pointer;
            }
            .user-type{
                margin-left: 5px;
             }
             .logout{
                margin-left: 15px;
             }
        }
}
    .body{
        display: flex;
        .left-sider{
            width: 260px;
            display: flex;
            height: calc(100vh - 60px);
            border-right: 1px solid #f1f2f4;
            box-shadow: 0 3px 10px 0 rgba(14,14,14,0.06);
            .menu-list{
                width: 70px;
                text-align: center;
                background: #1a1a1a;
                .menu-item{
                    text-align: center;
                    padding: 15px 0px ;
                    cursor: pointer;
                    color: #fff;
                    .iconfont{
                        font-size: 20px;
                    }
                    .icon-app{
                        font-size: 25px;
                    }
                    .menu-name{
                        font-weight: bold;
                    }
                    &:hover{
                        color: #06a7ff;
                    }
                }
                .active{
                    background: #06a7ff;
                    &:hover{
                        color: #fff;
                    }
                }
            }
            .menu-sub-list{
                flex: 1;
                position: relative;
                padding: 5px 5px;
                .sub-menu{
                    margin-top: 5px;
                    cursor: pointer;
                    padding: 10px 8px;
                    border-radius: 5px;
                    &:hover{
                        color: #05a1f5;
                    }
                }
                .active{
                    background: #e8f4ff;
                    color: #1890ff;
                }
            }
        }
        .main-content{
            width: 100%;
            .tag-content{
                :deep .el-tabs--border-card{
                    border: none;
                }
                :deep .el-tabs__content{
                    display: none;
                }
            }
            .body-content{
                padding: 10px;
            }
        }
    }
}
</style> 
