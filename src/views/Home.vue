<template>
  <div class="div-main">
    <div class="div-header">
      <span>中国移动管理系统</span>
    </div>
    <div class="div-body">
      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="0"
        text-color="#fff" @select="handleSelect">
        <el-menu-item index="0">
          <el-icon><icon-menu /></el-icon>
          <span>路线规划</span>
        </el-menu-item>
        <el-menu-item index="1">
          <el-icon>
            <document />
          </el-icon>
          <span>节点管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <setting />
          </el-icon>
          <span>路线管理</span>
        </el-menu-item>

      </el-menu>


      <RouterView class="container" />


    </div>

  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)

  if (key === "0") {
    router.push('graph')
  } else if (key === "1") {
    router.push('node')
  } else {
    router.push('edge')
  }

}

</script>

<style scoped>
.div-main {
  height: 100%;
  width: 100%;
}

.div-header {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #434A50;
}

.div-header span {
  margin-left: 50px;
  color: white;
  font-size: 20px;
}

.div-body {
  /* background-color: blue; */
  display: flex;
  height: 100%;
  width: 100%;
}

.side-bar {
  /* background-color: bisque; */
  width: 150px;
}

.container {
  /* background-color: aqua; */
  width: 100%;
  height: 100%;
}
</style>