<template>
  <div class="div-graph-main">
    <div class="div-graph-header">
      <el-select v-model="state.form.sid" placeholder="请选择起点" class="my-select">
        <el-option v-for="(item, index) in state.nodes" :key="index" :label="item.name" :value="item.id" />

      </el-select>
      <el-select v-model="state.form.tid" placeholder="请选择终点" class="my-select">
        <el-option v-for="(item, index) in state.nodes" :key="index" :label="item.name" :value="item.id" />

      </el-select>
      <el-select v-model="state.form.sid" placeholder="级别限制" class="my-select">
        <el-option v-for="(item, index) in state.levels" :key="index" :label="item.name" :value="item.id" />

      </el-select>

      <el-button class="btn-search" type="primary" plain @click="searchGraph">查询</el-button>

    </div>

    <el-table :data="state.graphs" style="width: 100%" class="my-table">
      <el-table-column type="index" label="编号" width="80" />
      <el-table-column prop="routes" label="路线名称" width="500" />
      <el-table-column prop="sum" label="衰耗" width="80" />
    </el-table>
    <div class="example-pagination-block">
      <el-pagination layout="prev, pager, next" :total="state.total" :page-size="state.count"
        @current-change="pageChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import userStore from '../../stores';

const { nodeStore, graphStore } = userStore()
const state = reactive({
  total: 0,
  page: 1,
  count: 8,
  sid: '',
  tid: '',
  level: '',
  graphs: [],
  form: {},
  levels: [{ id: 0, name: '无' },
  { id: 1, name: '核心' },
  { id: 2, name: '汇聚' },
  { id: 3, name: '接入' }]
})

const searchGraph = () => {

  state.page = 1
  getGraphs()
}

const pageChange = (number) => {
  state.page = number
  getGraphs()
}

const getAllNodes = () => {
  let param = { page: 1, count: 10000, query: "" }
  nodeStore.getNodePage(param).then((res) => {
    state.nodes = res.list
  }).catch((error) => {
    console.log(error)
  })
}

const getGraphs = () => {
  let param = state.form
  if (state.level) {
    param.level = state.level
  }
  graphStore.getGraphs(param).then((res) => {
    state.graphs = res.list
  }).catch((error) => {
    console.log(error)
  })

}

onMounted(() => {
  
  getAllNodes()

})

</script>

<style scoped>
.div-graph-main {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
}

.div-graph-header {
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  align-items: center;
}

.my-select {
  margin-left: 20px;
}

.my-table {
  margin-left: 20px;
}

.example-pagination-block {
  /* position: absolute;
  bottom: 10px;
  right: 50px; */
  margin-top: 20px;
  margin-bottom: 20px;
  float: right;
  margin-right: 50px;
}

.btn-search {
  margin-left: 20px;
}</style>