<template>
  <el-button class="el-form-item-btn" type="primary" @click="onClickExportData">导出</el-button>
</template>

<script lang="ts" setup name="button-export">
import { exportFileWithTips } from '@/utils/export'

const props = defineProps<{
  fileName: string
  fetch: Function
  param?: object
}>()

async function onClickExportData() {
  try {
    const { fetch, fileName, param } = props
    const result = await fetch(param)
    exportFileWithTips(result, fileName)
  } catch (err) {
    console.log(err)
  }
}
</script>
