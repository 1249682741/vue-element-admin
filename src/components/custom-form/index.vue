<script lang="ts" setup name="custom-form">
import { ref } from 'vue'
import { isInput, isSelect } from '@/utils/validate'
import { useVModel } from '@vueuse/core'

type Props = {
  config: FormConfig[]
  data: any
}
const props = defineProps<Props>()

type Emit = {
  (e: 'update:data', data: any): void
}

const emit = defineEmits<Emit>()

const defaultOptionLabel = ref<string>('label')
const defaultOptionValue = ref<string>('value')

const data = useVModel(props, 'data', emit)
</script>

<template>
  <el-form v-bind="$attrs">
    <slot name="header"></slot>
    <el-form-item v-for="item in config" :key="item.prop" :label="item.label">
      <el-input v-if="isInput(item.type)" v-model="data[item.prop]" />

      <el-select v-if="isSelect(item.type)" v-model="data[item.prop]">
        <el-option v-for="o in item.options" :key="o[item?.optionValue ?? defaultOptionValue]" :label="o[item?.optionLabel ?? defaultOptionLabel]" />
      </el-select>
    </el-form-item>
    <slot name="footer"></slot>
  </el-form>
</template>
