<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useVModels } from '@vueuse/core'
import { ElTree } from 'element-plus'

type Props = {
  type: DialogType
  visible: boolean
  data: any
}
const props = defineProps<Props>()

type Emit = {
  (e: 'submit'): void
  (e: 'update:visible', visible: boolean): void
  (e: 'update:data', data: any): void
}
const emit = defineEmits<Emit>()
const { visible, data } = useVModels(props, emit)

const config = [
  { label: '角色名称', prop: 'name', type: 'text' },
  { label: '角色描述', prop: 'remark', type: 'text' },
]

const treeData = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

const defaultTreeProps = {
  label: 'label',
  children: 'children',
}

type Tree = { name: string }
const handleCheckChange = (data: Tree, checked: boolean, indeterminate: boolean) => {
  console.log(data, checked, indeterminate)
}

const treeRef = ref<InstanceType<typeof ElTree>>()

const titleObj = {
  add: '新增',
  edit: '编辑',
}
const title = ref<string>(titleObj[props.type])
let defaultChecked = ref<string[] | number[]>([])
/**
 * 获取用户选择的菜单
 */
const getCheckedKeys = () => {
  return treeRef.value!.getCheckedKeys(false)
}

watch(visible, (val) => {
  if (!val) return
  // 显示 dialog 的同时， 初始化需要勾选的菜单
  defaultChecked.value = [3]
})

const onSubmit = () => {
  let ids = getCheckedKeys()
  emit('submit')
}
</script>

<template>
  <el-dialog append-to-body v-model="visible" :title="title" draggable destroy-on-close>
    <custom-form :config="config" v-model:data="data">
      <template #footer>
        <el-form-item label="角色权限">
          <el-tree
            :default-checked-keys="defaultChecked"
            ref="treeRef"
            node-key="id"
            :data="treeData"
            :prop="defaultTreeProps"
            highlight-current
            default-expand-all
            show-checkbox
            @check-change="handleCheckChange"
          />
        </el-form-item>
      </template>
    </custom-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
