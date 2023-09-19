<template>
  <div class="div-edge-main" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="div-edge-header">
      <el-input class="et-text" v-model="state.query" placeholder="请输入边名称" />
      <el-button class="btn-search" type="primary" plain @click="searchEdge">查询</el-button>
      <el-button type="primary" plain class="btn-add" @click="state.dialogFormVisible = true">新增边</el-button>

    </div>

    <el-table :data="state.edges" style="width: 100%" class="my-table">
      <el-table-column type="index" label="编号" width="100" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="sname" label="起点名称" width="180" />
      <el-table-column prop="tname" label="终点名称" width="180" />
      <el-table-column prop="w" label="距离" width="80" />
      <el-table-column prop="k" label="衰耗" width="80" />
      <el-table-column prop="level" label="级别" width="80" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination layout="prev, pager, next" :total="state.total" :page-size="state.count" @current-change="pageChange"/>
    </div>

  </div>
  <el-dialog v-model="state.dialogFormVisible" title="添加边" @close="state.form={}">
    <el-form :model="state.form">
      <el-form-item label="起点" :label-width="formLabelWidth">
        <el-select v-model="state.form.sid" placeholder="请选择起点">
          <el-option v-for="(item,index) in state.nodes" :key="index" :label="item.name" :value="item.id" />
          
        </el-select>
      </el-form-item>
      <el-form-item label="终点" :label-width="formLabelWidth">
        <el-select v-model="state.form.tid" placeholder="请选择终点">
          <el-option v-for="(item,index) in state.nodes" :key="index" :label="item.name" :value="item.id" />
          
        </el-select>
      </el-form-item>
      <el-form-item label="边名称" :label-width="formLabelWidth">
        <el-input v-model="state.form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="距离" :label-width="formLabelWidth">
        <el-input v-model="state.form.w" autocomplete="off" />
      </el-form-item>
      <el-form-item label="衰耗系数" :label-width="formLabelWidth">
        <el-input v-model="state.form.k" autocomplete="off" />
      </el-form-item>
      <el-form-item label="级别" :label-width="formLabelWidth">
        <el-input v-model="state.form.level" autocomplete="off" />
      </el-form-item>  
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addEdge()">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="state.dialogFormVisible2" title="编辑边" @close="state.form={}">
    <el-form :model="state.form">
      
      <el-form-item label="边名称" :label-width="formLabelWidth">
        <el-input v-model="state.form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="距离" :label-width="formLabelWidth">
        <el-input v-model="state.form.w" autocomplete="off" />
      </el-form-item>
      <el-form-item label="衰耗系数" :label-width="formLabelWidth">
        <el-input v-model="state.form.k" autocomplete="off" />
      </el-form-item>
      <el-form-item label="级别" :label-width="formLabelWidth">
        <el-input v-model="state.form.level" autocomplete="off" />
      </el-form-item>  
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="updateEdge()">
          更新
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import userStore from '../../stores/index'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const formLabelWidth = '140px'

const fullscreenLoading = ref(false)
//变量
const state = reactive({
  fixed: true,
  total:0,
  page: 1,
  count: 8,
  query: '',
  nodes:[],
  edges: [],
  form: {},
  dialogFormVisible: false,
  dialogFormVisible2: false,
})

const { nodeStore,edgeStore } = userStore()

const getAllNodes=()=>{
  let param = {page:1,count:10000,query:""}
  nodeStore.getNodePage(param).then((res)=>{
    state.nodes = res.list
  }).catch((error)=>{
    console.log(error)
  })
}

const searchEdge = () => {
  state.page = 1
  getEdgePage()
}

const getEdgePage = () => {
  fullscreenLoading.value = true
  let param = { page: state.page, count: state.count, query: state.query }
  edgeStore.getEdgePage(param).then((res) => {
    fullscreenLoading.value = false
    state.edges = res.list
    state.total = res.total
    console.log(state.edges)
  }).catch((error) => {
    console.log(error)
    fullscreenLoading.value = false
    ElMessage.error("获取边列表失败")
  })

}
const addEdge = () => {
  state.dialogFormVisible = false
  let param = state.form
  edgeStore.addEdge(param).then((res) => {
    getEdgePage()
    ElMessage({
      message: '添加边成功',
      type: 'success',
    })
  }).catch((error) => {
    console.log(error)
    ElMessage.error("添加边失败")
  })
}

const updateEdge = () => {
  state.dialogFormVisible2 = false
  let param = state.form
  edgeStore.updateEdge(param).then((res) => {
    getEdgePage()
    ElMessage({
      message: '更新边成功',
      type: 'success',
    })
  }).catch((error) => {
    console.log(error)
    ElMessage.error("更新边失败")
  })
}

const deleteEdge = (id) => {
  console.log(id)
  edgeStore.deleteEdge(id).then((res) => {
    getEdgePage()
    ElMessage({
      message: '删除边成功',
      type: 'success',
    })
  }).catch((error) => {
    console.log(error)
    ElMessage.error("删除边失败")
  })
}

const handleEdit = (index, row) => {
  //console.log(index, row)
  state.form.name = row.name
  state.form.w = row.w
  state.form.k = row.k
  state.form.level = row.level
  state.form.id = row.id
  state.dialogFormVisible2 = true
  console.log(state.dialogFormVisible2)
}
const handleDelete = (index, row) => {
  //console.log(index, row)
  deleteEdge(row.id)

}
const pageChange=(number)=>{
  state.page = number
  getEdgePage()
}

onMounted(() => {

  getEdgePage()
  getAllNodes()
})

</script>

<style scoped>
.div-edge-main{
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  height: 500px;
  width: 100%;
}
.div-edge-header {
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  align-items: center;
}


.my-table {
  margin-left: 20px;
}

.et-text {
  width: 200px;
  margin-left: 20px;
}

.btn-search {
  margin-left: 20px;
}

.btn-add {
  position: absolute;
  right: 50px;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
.example-pagination-block{
  /* position: absolute;
  bottom: 10px;
  right: 50px; */
  margin-top: 20px;
  margin-bottom: 20px;
  float: right;
  margin-right: 50px;
}
</style>