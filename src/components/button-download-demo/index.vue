<template>
  <el-button class="el-form-item-btn" type="primary" @click="onClickExportTemplate">下载导入模板</el-button>
</template>

<script lang="ts" setup name="button-download-demo">
import { exportFileWithTips } from '@/utils/export'

const props = defineProps<{
  fetch: Function
  fileName: string
}>()

async function onClickExportTemplate() {
  try {
    const { fetch, fileName } = props
    const result = await props.fetch()
    exportFileWithTips(result, fileName)
  } catch (err) {
    console.log(err)
  }
}
</script>
