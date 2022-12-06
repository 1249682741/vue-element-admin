<script lang="ts" setup name="user">
import { onMounted } from 'vue'
import CustomDialog from './component/dialog.vue'
import { useDialog } from './useDialog'
import { useTable } from './useTable'
import { useSearch } from './useSearch'

const { page, tableData, tableLoading, tableConfig, getListData } = useTable()
const { searchConfig, searchData, onSearch } = useSearch({ getListData, page })
const { dialogTitle, dialogVisible, dialogData, showDialog, submit, onDelete } = useDialog()

onMounted(() => {
  getListData()
})
</script>

<template>
  <div class="header-form-wrap">
    <custom-form :config="searchConfig" v-model:data="searchData" inline>
      <template #footer>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="showDialog('add')">新增</el-button>
        </el-form-item>
      </template>
    </custom-form>
  </div>

  <el-table :data="tableData" v-loading="tableLoading" border>
    <el-table-column v-for="item in tableConfig" :key="item.prop" :label="item.label" :prop="item.prop" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="showDialog('edit', scope.row)">编辑</el-button>
        <el-button type="danger" @click="onDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-model:pageNum="page.pageNum" v-model:pageSize="page.pageSize" :total="page.total" @pagination="getListData" />

  <custom-dialog v-model:visible="dialogVisible" :title="dialogTitle" @submit="submit" v-model:data="dialogData" />
</template>
