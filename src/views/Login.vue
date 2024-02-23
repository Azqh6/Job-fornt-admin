<template>
  <div>
    <div class="login-body">
        <div class="login-panel">
                <el-form
                    class="login-form"
                    :model="formData"
                    :rules="rules"
                    ref="formDataRef"
                    @submit.prevent
                >
                <p class="login-title">EasyJob管理平台</p>
                    <el-form-item prop="phone">
                        <el-input placeholder="请输入手机号" clearable v-model="formData.phone">
                            <template #prefix>
                                <span class="iconfont icon-phone"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" show-password placeholder="请输入密码" clearable v-model="formData.password">
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="checkCode">
                        <div class="check-code-panel">
                            <el-input placeholder="请输入验证码" clearable v-model="formData.checkCode">
                                <template #prefix>
                                    <span class="iconfont icon-yanzhengyanzhengma"></span>
                                </template>
                            </el-input>
                            <img :src='checkCode' @click="changeCheckCode" class="check-code">
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="rememberme-panel">
                            <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="large" class="op-btn" @click="doSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick ,onMounted} from "vue"
import { md5 } from "js-md5";
const { proxy } = getCurrentInstance();
import { useRouter , useRoute} from 'vue-router';
const router = useRouter();
const route = useRoute();
const api={
    checkCode:"/api/checkCode",
    login:"/login"
}
const init=()=>{
    nextTick(()=>{
        formDataRef.value.resetFields();
        formData.value={}
        const cookieLoginInfo = proxy.VueCookies.get('loginInfo');
        if(cookieLoginInfo){
            formData.value=cookieLoginInfo
        }
    })
}
//点击切换验证码
const checkCode=ref(api.checkCode)
const changeCheckCode=()=>{
    checkCode.value=`${api.checkCode}?time=${new Date().getTime()}`;
}

//登录表单
let formDataRef = ref(null);
let formData = ref({});
const rules={
    phone:[{ required: true, message: '请输入手机号', trigger: 'blur' }],
    password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
    checkCode:[{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
//登录
const doSubmit = () => {
    formDataRef.value.validate(async (valid)=>{
        if(!valid){
            return; 
        }
        let params={}
        Object.assign(params,formData.value)
        let cookieLoginInfo = proxy.VueCookies.get('loginInfo');
        let cookiePassword= cookieLoginInfo == null? null: cookieLoginInfo.password;
        if(params.password !== cookiePassword){
            params.password=md5(params.password)
        }

        let result=await proxy.Request({
            url:api.login,
            params,
            errorCallback:()=>{
                changeCheckCode()
            }
        })
        if(!result){
            return
        }
        if(params.rememberMe){
            let loginInfo={
                phone:params.phone,
                password:params.password,
                rememberMe:params.rememberMe
            }
            proxy.VueCookies.set('loginInfo',JSON.stringify(loginInfo),'7d')
        }else{
            proxy.VueCookies.remove('loginInfo')
        }
        sessionStorage.setItem('userInfo',JSON.stringify(result.data))
        proxy.Message.success('登录成功')
        let firstMenu=result.data.menuList[0]
        if(firstMenu.children.length>0){
            firstMenu=firstMenu.children[0]
        }
        router.push(firstMenu.menuUrl)
    })
}

</script>

<style lang="scss" scoped>
.login-body{
    height: 100vh;
    background: url('../assets//login-bg.jpg');
    background-size:cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row-reverse;
    .login-panel{
        width: 430px;
        margin-right: 15%;
        margin-top: calc((100vh - 500px) / 2 );
        .login-form{
            padding: 25px;
            background: #fff;
            border-radius: 5px;
            .login-title{
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .send-email-panel{
                display: flex;
                width: 100%;
                justify-content: space-between;
                .send-mail-btn{
                    margin-left: 5px;
                }
            }
            .rememberme-panel{
                width: 100%;
            }
            .no-account{
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .op-btn{
                width: 100%;
            }
        }
    }
    .check-code-panel{
        width: 100%;
        display: flex;
        .check-code{
            margin-left: 5px;
            cursor: pointer;
        }
    }
}
</style>
