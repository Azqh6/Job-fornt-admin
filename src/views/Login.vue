<template>
  <div>
    <el-pagination
      v-model:current-page="currentPage1"
      :page-size="100"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-button type="primary">登录</el-button>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
</style>
