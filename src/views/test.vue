<template>
  <!-- <el-button type="primary" style="margin-left: 16px" @click="goRouter('./test2')">
    路由1
  </el-button>
  <el-button type="primary" style="margin-left: 16px" @click="goRouter('./test3')">
    路由2
  </el-button>
  <el-drawer v-model="drawer" title="I am the title" size="800" :show-close="true" :modal="false" :append-to-body="true" z-index="-1">
    <router-view></router-view>
  </el-drawer> -->
  <div class="big-bro"></div>
  <div class="young-ber"></div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick,onMounted} from "vue"
const { proxy } = getCurrentInstance();
import { useRouter , useRoute} from 'vue-router';

const router = useRouter();
const route = useRoute();
const drawer = ref(false)

const fn=(data)=>{
  console.log(1);
  if(data){
    console.log(data);
  }
}
fn()
// const goRouter=(path)=>{
//   drawer.value=false
//   setTimeout(()=>{
//     drawer.value=true
//   },500)
  
//   router.push(path)
// }
// const isRepat=(arr)=>{
//   let temp={}
//   for(let i in arr){
//     temp=arr[i]
//     for(let j=i+1;i<arr.length;j++){
//       if(arr[j]&&temp.title==arr[j].title){
//         console.log('有重复的',`重复项为${i},${j}`);
//         return
//       }
//     }
//     console.log('没有重复的');
//     return
//   }
// }
// function hasDuplicateTitle(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i].title === arr[j].title) {
//         return true; // 发现重复的 title
//       }
//     }
//   }
//   return false; // 没有重复的 title
// }
// function hasDuplicateTitle(arr) {
//   const titles = new Set();
//   for (let item of arr) {
//     if (titles.has(item.title)) {
//       return true; // 发现重复的 title
//     }
//     titles.add(item.title);
//   }
//   return false; // 没有重复的 title
// }

// const arr = [
//   { title: '111', sort: 1 },
//   { title: '222', sort: 2 },
//   { title: '333', sort: 3 },
//   { title: '444', sort: 4 }
// ];

// console.log(hasDuplicateTitle(arr)); // 输出 false

// isRepat(arr)
</script>

<style lang="scss" scoped>
.big-bro{
    width: 100px;
    height: 200px;
    background:rgba(0,0,0,0.3);
    float: left;
    border: 2px solid blue;
  }

  .young-ber{
    height: 200px;
    background: yellow;
    border: 5px solid red;
    overflow: hidden;
  }
</style>
