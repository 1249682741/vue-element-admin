<template>
  <el-upload class="avatar-uploader" :show-file-list="false" list-type="picture" action="" :http-request="uploadFile">
    <img class="avatar" v-if="modelValue" :src="BaseFileUrl + modelValue" />
    <el-icon v-else class="icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup name="button-upload-img">
import { useVModel } from '@vueuse/core'
import { UploadRequestOptions } from 'element-plus'
import { upload } from '@/api/common'
import { ResponseCode, BaseFileUrl } from '@/constant'
const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits)

async function uploadFile({ file }: UploadRequestOptions) {
  let formData = new FormData()
  formData.append('file', file)
  const result = await upload(formData)
  if (result.code == ResponseCode.OK) {
    modelValue.value = result.data.uploadUrl
  }
}
</script>

<style lang="scss" scoped>
$size: 120px;
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  & .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .avatar {
    width: $size;
    height: $size;
  }
  .icon {
    font-size: 28px;
    color: #8c939d;
    width: $size;
    height: $size;
    text-align: center;
  }
}
</style>
