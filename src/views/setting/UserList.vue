<template>
  <div>
    <div class="top-panel">
      <el-card>
      <el-form :model="searchForm" label-width="70px" label-position="right">
          <el-row>
              <el-col :span="5">
                <el-form-item label="用户名">
                  <el-input
                    class="password-input"
                    v-model="searchForm.userName"
                    claerabele
                    placeholder="支持模糊搜索"
                    @keyup.enter.native="loadDataList"
                  >
                  </el-input>
              </el-form-item>
            </el-col>  
            <el-col :span="5">
              <el-form-item label="电话">
                <el-input
                  class="password-input"
                  v-model="searchForm.phone"
                  claerabele
                  placeholder="支持模糊搜索"
                  @keyup.enter.native="loadDataList"
                >
               </el-input>
              </el-form-item>
            </el-col>  
            <el-col :span="4" :style="{paddingLeft:'10px'}">
              <el-button type="success" @click="loadDataList()">查询</el-button>
              <el-button type="primary" @click="showEdit()">新增用户</el-button>
            </el-col>
          </el-row>
      </el-form>
    </el-card>
    </div>
    <el-card class="table-data-card">
          <template #header>
            <span>角色列表</span>
          </template>
          <Table
            ref="tableInfoRef"
            :columns="columns"
            :fetch="loadDataList"
            :dataSource="tableData"
            :options="tableOptions"
            :extHeight="tableOptions.extHeight"
          >
            <template #slotStatus="{index,row}">
              <div class="row-op-panel">
                  <span style="color:red" v-if="row.status==0">禁用</span>
                  <span style="color:green" v-else>启用</span>
              </div>
            </template>
            <template #slotOperation="{index,row}">
              <div 
                class="row-op-panel"
                v-if="!(userInfo.superAdmin && userInfo.userId==row.userId)"
              >
                <a
                  class="a-link"
                  href="javascript:void(0);"
                  @click="showEdit(row)"
                  v-has="proxy.PermissionCode.account.edit"    
                >
                  修改
                </a>
                <a
                  class="a-link"
                  href="javascript:void(0);"
                  @click="updatePassword(row)" 
                  v-has="proxy.PermissionCode.account.updatePwd"    
                >
                  修改密码
                </a>
                <a
                  class="a-link"
                  href="javascript:void(0);"
                  @click.prevent="changeAccountStatus(row)"
                  v-has="proxy.PermissionCode.account.updateStatus"      
                >
                 {{ row.status == 0 ? '启用' : '禁用' }}
                </a>
                <a
                  class="a-link"
                  href="javascript:void(0);"
                  @click.prevent="delAccount(row)"
                  v-has="proxy.PermissionCode.account.del"
                >
                  删除
                </a>
              </div>
            </template>
          </Table>
    </el-card>
    <UserEdit
      ref="userEditRef"
      @reload="loadDataList"
    >
    </UserEdit>
    <PasswordEdit
      ref="passwordEditRef"
    >
    </PasswordEdit>
  </div>
</template>

<script setup>
import UserEdit from "./UserEdit.vue";
import PasswordEdit from "./PasswordEdit.vue";
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();
const api={
  loadDataList:'/settings/loadAccountList',
  delAccount:'/settings/delAccount',
  updateStatus:'/settings/updateStatus'
}
const userInfo=JSON.parse(sessionStorage.getItem("userInfo") || {menuList:[]})
//搜索
const searchForm=ref({})
const tableInfoRef=ref()
const loadDataList=async()=>{
  let params={
    pageNo:tableData.value.pageNo,
    pageSize:tableData.value.pageSize
  }
  Object.assign(params,searchForm.value)
  let result=await proxy.Request({
    url:api.loadDataList,
    params
  })
  if(!result){
    return
  }
  Object.assign(tableData.value,result.data)
}

//表格
const tableData=ref({})
const tableOptions=ref({
  extHeight:125
})
const columns=[
  {
    label:'用户名',
    prop:'userName',
    width: 150
  },
  {
    label:'手机',
    prop:'phone',
    width: 200
  },
  {
    label:'拥有角色',
    prop:'roleNames',
  },
  {
    label:'创建时间',
    prop:'createTime',
    width: 200
  },
  {
    label:'状态',
    prop:'status',
    width: 100,
    scopedSlots:'slotStatus'
  },
  {
    label:'操作',
    prop:'operation',
    width: 220,
    scopedSlots:'slotOperation'
  },
]


//删除角色
const delAccount=(data)=>{
    proxy.Confirm(`确定要删除${data.userName}吗？`,async()=>{
      let result=await proxy.Request({
        url:api.delAccount,
        params:{
          userId:data.userId
        }
      })
      if(!result){
        return
      }
      proxy.Message.success('删除成功')
      loadDataList()
    })
}
//禁用启用
const changeAccountStatus=(data)=>{
    let status= data.status == 0 ? 1 : 0 
    let info = status == 0 ? '禁用':'启用'
    proxy.Confirm(`确定要${info}${data.userName}吗？`,async()=>{
      let result=await proxy.Request({
        url:api.updateStatus,
        params:{
          userId:data.userId,
          status:status
        }
      })
      if(!result){
        return
      }
      proxy.Message.success('操作成功')
      loadDataList()
    })
}
//修改角色
const userEditRef=ref()
const showEdit=(data={})=>{
  userEditRef.value.showEdit(Object.assign({},data))
}
//修改密码
const passwordEditRef=ref()
const updatePassword=(data={})=>{
  passwordEditRef.value.showEdit(Object.assign({},data))
}
</script>

<style lang="scss" scoped>
</style>
