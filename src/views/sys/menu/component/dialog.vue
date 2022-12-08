<script lang="ts" setup>
import { ref, readonly } from 'vue'
import { useVModels } from '@vueuse/core'
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

const config = readonly([
  { label: '菜单名称', prop: 'name', type: 'text' },
  { label: '前端路由', prop: 'route', type: 'text' },
  { label: '菜单权限', prop: 'permission', type: 'text' },
  {
    label: '菜单类型',
    prop: 'type',
    type: 'radio',
    options: [
      { label: '菜单', value: 0 },
      { label: '按钮', value: 1 },
    ],
  },
])

const teeeData = ref([
  {
    label: '系统管理',
    children: [{ label: '用户管理' }, { label: '角色管理' }, { label: '菜单管理' }],
  },
  {
    label: '货主管理',
  },
  {
    label: '司机管理',
  },
])

const defaultTreeProps = {
  label: 'label',
  children: 'children',
}

const onSubmit = () => {
  emit('submit')
}

const titleObj = {
  add: '新增',
  edit: '编辑',
}
const title = ref<string>(titleObj[props.type])
</script>

<template>
  <el-dialog append-to-body v-model="visible" :title="title" draggable>
    <custom-form :config="config" v-model:data="data">
      <template #footer>
        <el-form-item label="上级菜单">
          <el-tree :data="teeeData" :prop="defaultTreeProps" highlight-current />
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
