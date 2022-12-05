<script lang="ts" setup>
import { onMounted, reactive, ref, readonly } from 'vue'
import { ListParams } from '@/types/sys/user'
import * as Server from '@/api/sys/user'

const searchConfig = ref([
  { label: '姓名', prop: 'name', type: 'text' },
  { label: '电话', prop: 'phone', type: 'text' },
])

const page = reactive<PageProps>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

const tableData = ref([])
const tableLoading = ref<boolean>(false)
const tableConfig = readonly([
  { label: '姓名', prop: 'name' },
  { label: '电话', prop: 'phone' },
])

/**
 * 请求列表信息
 */
const getListData = async () => {
  try {
    tableLoading.value = true
    const result = await Server.list({
      pageNum: page.pageNum,
      pageSize: page.pageSize,
    })
    console.log(result)
    tableData.value = result.list
  } catch (err) {
  } finally {
    tableLoading.value = false
  }
}

onMounted(() => {
  getListData()
})
</script>

<template>
  <div class="header-btn-wrap">
    <el-button>新增</el-button>
  </div>
  <div class="header-form-wrap">
    <el-form>
      <el-form-item v-for="item in searchConfig"></el-form-item>
    </el-form>
  </div>

  <el-table :data="tableData" v-loading="tableLoading">
    <el-table-column v-for="item in tableConfig" :key="item.prop" :label="item.label" :prop="item.prop" />
    <el-table-column>
      <template #default="scope">
        <el-button>编辑</el-button>
        <el-button>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-model:pageNum="page.pageNum" v-model:pageSize="page.pageSize" :total="page.total" />
</template>
