<template>
  <el-upload class="el-form-item-btn upload-button" :show-file-list="false" action="" :http-request="onClickImportData">
    <el-button type="primary">导入</el-button>
  </el-upload>
</template>

<script lang="ts" setup name="button-import">
import { ResponseCode } from '@/constant'
import { ElMessage, UploadRequestOptions } from 'element-plus'

const props = defineProps<{
  fetch: Function
  getListData: () => void
}>()

async function onClickImportData({ file }: UploadRequestOptions) {
  try {
    let formData = new FormData()
    formData.append('file', file)
    const result = await props.fetch(formData)
    if (result.code == ResponseCode.OK) {
      props.getListData()
      ElMessage.success('导入成功')
    } else if (result.code == ResponseCode.Error) {
      ElMessage.error(result.msg)
    }
  } catch (err) {
    console.log(err)
  }
}
</script>
