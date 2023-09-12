<template>
  <div class="div-node-main" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="div-node-header">
      <el-input class="et-text" v-model="state.query" placeholder="请输入节点名称" />
      <el-button class="btn-search" type="primary" plain @click="searchNode">查询</el-button>
      <el-button type="primary" plain class="btn-add" @click="state.dialogFormVisible = true">新增节点</el-button>

    </div>

    <el-table :data="state.nodes" style="width: 100%" class="my-table">
      <el-table-column type="index" prop="id" label="编号" width="100" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="example-pagination-block">
      <el-pagination layout="prev, pager, next" :total="state.total" :page-size="state.count"
        @current-change="pageChange" />
    </div>

  </div>
  <el-dialog v-model="state.dialogFormVisible" title="添加节点">
    <el-form :model="state.form">
      <el-form-item label="节点名称" :label-width="formLabelWidth">
        <el-input v-model="state.form.name" autocomplete="off" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addNode()">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="state.dialogFormVisible2" title="编辑节点">
    <el-form :model="state.form">
      <el-form-item label="节点名称" :label-width="formLabelWidth">
        <el-input v-model="state.form.name" autocomplete="off" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="updateNode()">
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
  total: 0,
  page: 1,
  count: 8,
  query: '',
  nodes: [],
  form: {},
  dialogFormVisible: false,
  dialogFormVisible2: false,
})

const { nodeStore } = userStore()

const searchNode = () => {
  state.page = 1
  getNodePage()
}

const getNodePage = () => {
  fullscreenLoading.value = true
  let param = { page: state.page, count: state.count, query: state.query }
  nodeStore.getNodePage(param).then((res) => {

    state.nodes = res.list
    state.total = res.total
    console.log(state.nodes)
    fullscreenLoading.value = false
  }).catch((error) => {
    console.log(error)
    fullscreenLoading.value = false
  })

}
const addNode = () => {
  state.dialogFormVisible = false
  let param = { name: state.form.name }
  nodeStore.addNode(param).then((res) => {
    getNodePage()
    ElMessage({
      message: '添加节点成功',
      type: 'success',
    })
  }).catch((error) => {
    console.log(error)
    ElMessage.error("添加节点失败")
  })
}

const updateNode = () => {
  state.dialogFormVisible2 = false
  let param = { id: state.form.id, name: state.form.name }
  nodeStore.updateNode(param).then((res) => {
    getNodePage()
    ElMessage({
      message: '更新节点成功',
      type: 'success',
    })
  }).catch((error) => {
    console.log(error)
    ElMessage.error("更新节点失败")
  })
}

const deleteNode = (id) => {
  console.log(id)
  nodeStore.deleteNode(id).then((res) => {
    getNodePage()
    ElMessage({
      message: '删除节点成功',
      type: 'success',
    })
  }).catch((error) => {
    console.log(error)
    ElMessage.error("删除节点失败")
  })
}

const handleEdit = (index, row) => {
  //console.log(index, row)
  state.form.name = row.name
  state.form.id = row.id
  state.dialogFormVisible2 = true
  console.log(state.dialogFormVisible2)
}
const handleDelete = (index, row) => {
  //console.log(index, row)
  deleteNode(row.id)

}
const pageChange = (number) => {
  state.page = number
  getNodePage()
}

onMounted(() => {

  getNodePage()

})
</script>

<style scoped>
.div-node-header {
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  align-items: center;
}

.div-node-main {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
}

.my-table {
  margin-left: 50px;
}

.et-text {
  width: 200px;
  margin-left: 50px;
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

.example-pagination-block {
  /* position: absolute;
  bottom: 30px;
  left: 180px; */
  margin-top: 20px;
  margin-bottom: 20px;
  float: right;
  margin-right: 50px;
}
</style>