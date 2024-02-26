<template>
  <div>
    <Dialog
    :show="dialogConfig.show"
    :title="dialogConfig.title"
    :buttons="dialogConfig.buttons"
    width="400px"
    :showCancel="false"
    @close="dialogConfig.show = false"
    >
    <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
    >
    <el-form-item label="新密码" prop="password">
        <el-input
            type="password"
            clearable
            show-password
            v-model.trim="formData.password"
            placeholder="请输入新密码"
        >
            <template #prefix>
                <span class="iconfont icon-password"></span>
            </template>
        </el-input>
    </el-form-item>
    <el-form-item label="再次输入密码" prop="rePassword">
        <el-input
            type="password"
            clearable
            show-password
            placeholder="请再次确认新密码"
            v-model.trim="formData.rePassword"
        >
            <template #prefix>
                <span class="iconfont icon-password"></span>
            </template>
        </el-input>
    </el-form-item>
    </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();
const api={
    updateMyPwd:'/updateMyPwd'
}
const dialogConfig=ref(
    {
    show:false,
    title:"修改密码",
    buttons:[
        {
            type:'primary',
            text:'确定',
            click:(e)=>{
                save()
            }
        }
    ]
}
)
const formData = ref({});
const formDataRef = ref();
const checkPwd=(rule,value,callback)=>{
    if(value !== formData.value.password){
        callback(new Error("两次密码不一致"))
    }else{
        callback()
    }
}
const rules = {
  password: [
    { required: true, message: "请输入密码"},
    { validator:proxy.Verify.password,message:'请输入正确的密码'}
],
  rePassword:[
    {required:true,message:"请输入确认密码"},
    {validator:checkPwd,message:"两次密码不一致"}
]
};
const show=()=>{
    dialogConfig.value.show=true
    nextTick(()=>{
        formDataRef.value.resetFields()
        formData.value={}
    });
}
defineExpose({
    show
})
const save=()=>{
    formDataRef.value.validate(async (valid)=>{
        if(!valid){
            return; 
        }
        let params={}
        Object.assign(params,formData.value)
        let result=await proxy.Request({
            url:api.updateMyPwd,
            params
        })
        if(!result){
            return
        }
        proxy.Message.success('修改成功')
        dialogConfig.value.show=false
    })
}
</script>

<style lang="scss" scoped>
</style>
