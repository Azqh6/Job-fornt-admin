<template>
  <div>
    <div class="header"></div>
    <div class="content-panel">
        <div class="content"></div>
        <div class="aside-l"></div>
        <div class="aside-r"></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
const date=new Date()
console.log(date.getTime());
</script>

<style lang="scss" scoped>
.header{
    height: 50px;
    background-color: red;
}
.content-panel{
    background-color:aqua;
    display: flex;
    .aside-l{
        order: 1;
        width: 300px;
        height: 800px;
        background-color: aquamarine;
    }
    .content{
        order: 2;
        flex: 1;
        background-color:brown;
    };
    .aside-r{
        order: 3;
        width: 300px;
        height: 800px;
        background-color: aquamarine;
    }
}
.footer{
    height: 60px;
    background-color:antiquewhite;
}

</style>
