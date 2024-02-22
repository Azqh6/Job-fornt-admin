<template>
  <div>
    <div class="login-body">
        <div class="login-panel">
                <el-form
                    class="login-register"
                    :model="formData"
                    :rules="rules"
                    ref="formDataRef"
                    @submit.prevent
                >
                <p class="login-title">EasyJob管理平台</p>
                    <el-form-item prop="phone">
                        <el-input placeholder="请输入手机号" clearable v-model="formData.phone">
                            <template #prefix>
                                
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" clearable v-model="formData.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkCode">
                        <div class="check-code-panel">
                            <el-input placeholder="请输入验证码" clearable v-model="formData.checkCode"></el-input>
                            <img>
                        </div>
                     
                    </el-form-item>
                    <el-form-item>
                        <div class="rememberme-panel">
                            <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="large" style="width: 100%;">登录</el-button>
                    </el-form-item>
                </el-form>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();
let formDataRef = ref(null);
let formData = ref({});
const rules=[]
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
        .login-register{
            padding: 25px;
            background: #fff;
            border-radius: 5px;
            .login-title{
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
        }
    }
}
</style>
