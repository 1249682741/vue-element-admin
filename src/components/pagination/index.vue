<script lang="ts" setup name="pagination">
import { useVModels } from '@vueuse/core'

type PageProps = {
  pageNum: number
  pageSize: number
  total: number
}

const props = withDefaults(defineProps<PageProps>(), {
  pageNum: 1,
  pageSize: 10,
})

type Emit = {
  (e: 'update:pageNum', pageNum: number): void
  (e: 'update:pageSize', pageSize: number): void
  (e: 'pagination'): void
}

const emit = defineEmits<Emit>()

const { pageNum, pageSize } = useVModels(props, emit)

const updateCurrentPage = (...args: any[]) => {
  console.log('updateCurrentPage', ...args)
}

const updatePageSize = (...args: any[]) => {
  console.log('updatePageSize', ...args)
  // emit('pagination')
}
</script>

<template>
  <el-pagination
    class="page"
    background
    layout="total, sizes, prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page="pageNum"
    @update:current-page="updateCurrentPage"
    @update:page-size="updatePageSize"
  />
</template>

<style scoped lang="scss">
.page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
