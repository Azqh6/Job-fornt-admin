<template>
    <el-config-provider :locale="locale">
      <RouterView />
    </el-config-provider>

</template>
<script setup>
import {  RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn
</script>
<style scoped>
</style>
