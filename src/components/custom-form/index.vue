<template>
  <el-form ref="formRef" :model="data" :rules="rules" v-bind="$attrs">
    <slot name="header"></slot>
    <CustomFormItem v-for="item in config" :key="item.prop" :item="item" v-model:data="data" />
    <slot name="footer"></slot>
  </el-form>
</template>

<script lang="ts" setup name="custom-form">
import { useVModel } from '@vueuse/core'
import { CustomFormItem } from '@/components'
import { ElForm, FormRules } from 'element-plus'
import { ref } from 'vue'

const props = defineProps<{
  config: FormConfig[]
  data: any
  rules?: FormRules
}>()

const emit = defineEmits<{
  (e: 'update:data', data: any): void
}>()

const data = useVModel(props, 'data', emit)
const formRef = ref<InstanceType<typeof ElForm>>()
defineExpose({
  formRef,
})
</script>
