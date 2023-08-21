<template>
  <el-input v-model="modelValue" readonly :disabled="disabled" v-bind="$attrs">
    <template #append>
      <el-button @click="showDialog" type="primary">点击选择部门</el-button>
    </template>
  </el-input>

  <el-dialog append-to-body v-model="visible" title="选择部门" draggable width="600px" destroy-on-close>
    <el-form-item label="选择部门">
      <el-tree ref="treeRef" highlight-current lazy v-loading="treeLoading" :props="treeProps" :load="load" node-key="deptId" check-strictly />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="select-user-dept">
import { useVModel } from '@vueuse/core'
import { useTree } from './useTree'
import { ElTree } from 'element-plus'
import { ref, toRaw } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    disabled: boolean
  }>(),
  {
    modelValue: '',
    disabled: false,
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue'): void
  (e: 'change', item: Dept): void
}>()

const modelValue = useVModel(props, 'modelValue', emits)

const { treeProps, treeLoading, load, reset } = useTree()

const treeRef = ref<InstanceType<typeof ElTree>>()

const visible = ref(false)

function showDialog() {
  if (props.disabled) return
  visible.value = true
  reset()
}

function onSubmit() {
  let dept = toRaw(treeRef.value?.getCurrentNode() as unknown as Dept)
  console.log(dept)
  modelValue.value = dept.deptName
  emits('change', dept)
  visible.value = false
}
</script>
