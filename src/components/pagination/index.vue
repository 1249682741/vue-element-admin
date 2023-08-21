<script lang="ts" setup name="pagination">
import { useVModels } from '@vueuse/core'
import { watch } from 'vue'

type PageProps = {
  pageNum: number
  pageSize: number
  total: number
}

const props = withDefaults(defineProps<PageProps>(), {
  pageNum: 1,
  pageSize: 10,
})

const emits = defineEmits<{
  (e: 'update:pageNum', pageNum: number): void
  (e: 'update:pageSize', pageSize: number): void
  (e: 'pagination'): void
}>()

const { pageNum, pageSize } = useVModels(props, emits)

function changePageSize() {
  emits('pagination')
}
function changePageNum() {
  emits('pagination')
}
</script>

<template>
  <el-pagination
    class="page"
    background
    layout="total, sizes, prev, pager, next"
    :total="total"
    v-model:page-size="pageSize"
    v-model:current-page="pageNum"
    @size-change="changePageSize"
    @current-change="changePageNum"
  />
</template>

<style scoped lang="scss">
.page {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>
