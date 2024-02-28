<template>
  <Dialog
    :show="dialogConfig.show"
    :title="dialogConfig.title"
    :buttons="dialogConfig.buttons"
    :showCancel="true"
    @close="dialogConfig.show = false"
    >
    <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
    >
        <el-form-item label="用户名" prop="userName">
            <el-input
               :maxLength="20"
               v-model="formData.userId"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input
               :maxLength="11"
               v-model="formData.phone"
            >
            </el-input>
        </el-form-item>
        <template v-if="!formData.userId">
            <el-form-item label="密码" prop="password">
            <el-input
                type="password"
                show-password
                clearable
               :maxLength="20"
               v-model="formData.phone"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="rePassword">
            <el-input
            type="password"
                show-password
                clearable
               :maxLength="20"
               v-model="formData.rePassword"
            >
            </el-input>
        </el-form-item>  
        </template>
        <el-form-item label="职位" prop="position">
            <el-input
               :maxLength="20"
               v-model="formData.rePassword"
            >
            </el-input>
        </el-form-item>  
        <el-form-item label="角色" prop="roles">
            <el-checkbox-group v-model="formData.roles">
                <span
                    class="check-span-item"
                    v-for="(item,index) in roleList"
                    :key="index"
                >
                    <el-checkbox :label="item.roleId+ ''">
                        {{item.roleName}}
                    </el-checkbox>
                </span>
            </el-checkbox-group>
        </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();
const api={
    saveRole:'/settings/saveRole',
    loadAllRoles:'/settings/loadAllRoles'
}
//获取角色
const roleList = ref([]);
const loadRoleList = async ()=>{
    let result = await proxy.Request({
        url:api.loadAllRoles
    })
    if(!result){
        return
    }
    roleList.value=result.data
}
loadRoleList()

const dialogConfig = ref({
  show: false,
  title: "新增账号",
  buttons: [
   {
    type: "primary",
    text: "确定",
    click: (e) => {
      submitForm();
    },
  },
 ],
});
const validateRepass=(rule,value,callback)=>{
    if(value !== formData.value.password){
        callback(new Error("两次密码不一致"))
    }else{
        callback()
    }
}
const formData = ref({});
const formDataRef = ref();
const rules = {
    // userName:[{required:true,message:'请输入用户名'}],
    phone:[{required:true,message:'请输入手机号'}],
    password:[{required:true,message:'请输入密码'}],
    rePassword:[{required:true,message:'请输入确认密码'},{validator:validateRepass,message:'两次密码不一致'}],
    
};

//修改
const showEdit=(data)=>{
    dialogConfig.value.show=true
    nextTick(()=>{
        formDataRef.value.resetFields()
       if(data.userId==null){
        dialogConfig.value.title='新增账号'
        formData.value={roles:[]}
       }else{
        dialogConfig.value.title='修改账号'
        let editData=Object.assign({},data)
        editData.roles=editData.roles.split(',')
        formData.value=Object.assign({},editData)
       }
    })
}
defineExpose({showEdit})
const emit=defineEmits(['reload'])
const submitForm=async()=>{
    formDataRef.value.validate(async (valid)=>{
        if(!valid){
            return; 
        }
        let params={}
        Object.assign(params,formData.value)
        if(params.roleId){
            params.menuIds=null
        }else{
            params.menuIds=params.menuIds.join(',')
            let halfMenuIdArray=menuTreeRef.value.getHalfCheckedKeys() || []
            params.halfMenuIds=halfMenuIdArray.join(',')
        }
        let result=await proxy.Request({
            url:api.saveRole,
            params
        })
        if(!result){
            return
        }
        dialogConfig.value.show=false
        proxy.Message.success('保存成功')
        emit('reload')
    })
}
</script>

<style lang="scss" scoped>
.check-span-item{
    float:left;
    margin-right: 10px;
    line-height: 20px;
}
</style>
