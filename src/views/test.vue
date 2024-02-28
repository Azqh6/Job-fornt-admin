<template>
    <div class="content">
        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :props="{ class: customNodeClass }"
            @check-change="handleCheckChange"
            ref="treeRef"
            />
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();
const treeRef=ref()
const data = ref([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        isPenultimate: true,
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    isPenultimate: true,
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    isPenultimate: true,
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
])
const handleCheckChange=()=>{
    let menu=treeRef.value.getCheckedKeys()
    let menuhalf=treeRef.value.getHalfCheckedKeys()
    console.log(menu);
    console.log(menuhalf);

}
</script>

<style lang="scss" scoped>
.content{
    box-sizing: border-box;
    width: 500px;
    height: 300px;
    background-color: red;
    padding: 10px;
    margin: 20px;
    border: 5px solid blue;
    span{
        font-size: 10px;
        transform: scale(2);
    }
}
</style>
