<template>
  <el-tree-select :data="menuTreeData" v-model="modelValue" :props="treeProps" node-key="menuId" check-strictly filterable v-bind="$attrs" />
</template>

<script lang="ts" setup name="select-menu">
import { onMounted, ref, watch } from 'vue'
import { ResponseCode } from '@/constant'
import { ElMessage } from 'element-plus'
import { useVModel } from '@vueuse/core'
import { useMenuTree } from '@/hook/useMenuTree'
import { PlatformType } from '@/constant'

const props = defineProps<{
  treeData?: Menu[]
  platformType: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue'): void
}>()

const modelValue = useVModel(props, 'modelValue', emit)

const treeProps = { label: 'menuName', hasChildren: 'hasChild' }

const menuTreeData = ref<Menu[]>()

let { getMenuTree } = useMenuTree()

watch(
  () => props.platformType,
  async (platformType) => {
    if (props.treeData) return
    let data = await getMenuTree({ platformType })
    // @ts-ignore
    menuTreeData.value = [{ menuName: '根目录', menuId: '-1', parentId: '', hasChildren: false, children: data }]
  },
  {
    immediate: true,
  }
)

onMounted(async () => {
  if (props.treeData) {
    menuTreeData.value = props.treeData
    return
  }
})
</script>
