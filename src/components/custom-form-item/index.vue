<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-input v-if="isInput(item.type)" v-model="data[item.prop]" clearable v-bind="item">
      <template #append v-if="item.append">{{ item.append }}</template>
    </el-input>

    <el-select v-else-if="isSelect(item.type)" v-model="data[item.prop]" clearable filterable v-bind="item" :multiple="item.multiple">
      <el-option
        v-for="o in item.options"
        :key="o[item?.optionValue ?? defaultOptionValue]"
        :label="o[item?.optionLabel ?? defaultOptionLabel]"
        :value="o[item?.optionValue ?? defaultOptionValue]"
      />
    </el-select>

    <el-radio-group v-else-if="isRadio(item.type)" v-model="data[item.prop]" clearable v-bind="item">
      <el-radio v-for="o in item.options" :key="o[item?.optionValue ?? defaultOptionValue]" :label="o[item?.optionValue ?? defaultOptionValue]">
        {{ o[item?.optionLabel ?? defaultOptionLabel] }}
      </el-radio>
    </el-radio-group>

    <el-checkbox-group v-else-if="isCheckbox(item.type)" v-model="data[item.prop]" clearable v-bind="item">
      <el-checkbox v-for="o in item.options" :key="o[item?.optionValue ?? defaultOptionValue]" :label="o[item?.optionValue ?? defaultOptionValue]">
        {{ o[item?.optionLabel ?? defaultOptionLabel] }}
      </el-checkbox>
    </el-checkbox-group>

    <el-date-picker v-else-if="isDatePicker(item.type)" v-model="data[item.prop]" clearable v-bind="(item as any)" />

    <template v-else-if="customComponent[item.type as keyof typeof customComponent]">
      <component
        :is="customComponent[item.type as keyof typeof customComponent]"
        v-model="data[item.prop]"
        @change="(...args: any[]) => onComponentChange(item, ...args)"
        v-bind="item"
      />
    </template>
    <i class="subTips" v-if="item.subTips" :title="item.subTips">{{ item.subTips }}</i>
  </el-form-item>
</template>

<script lang="ts" setup name="custom-form-item">
import { ref } from 'vue'
import { isInput, isSelect, isRadio, isCheckbox, isDatePicker } from '@/utils/validate'
import { useVModel } from '@vueuse/core'
import { ButtonUploadImg, SelectMenu, SelectUserDeptDialog } from '..'

const customComponent = { ButtonUploadImg, SelectMenu, SelectUserDeptDialog }

const props = defineProps<{
  item: FormConfig
  data: any
}>()

const emits = defineEmits<{
  (e: 'update:data', data: any): void
}>()

const defaultOptionLabel = ref<string>('label')
const defaultOptionValue = ref<string>('value')

const data = useVModel(props, 'data', emits)

function onComponentChange({ change }: FormConfig, ...args: any[]) {
  if (typeof change == 'function') {
    change(...args)
  }
}
</script>

<style lang="scss" scoped>
.subTips {
  font-size: 10px;
  color: #999;
  font-style: normal;
}
</style>
