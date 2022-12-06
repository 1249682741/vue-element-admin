<script lang="ts" setup>
import { ref, readonly } from 'vue'
import { useVModels } from '@vueuse/core'
type Props = {
  title: string
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
  { label: '姓名', prop: 'name', type: 'text' },
  { label: '电话', prop: 'phone', type: 'text' },
])

const onSubmit = () => {
  emit('submit')
}
</script>

<template>
  <el-dialog append-to-body v-model="visible" :title="title" draggable>
    <custom-form :config="config" v-model:data="data">
      <!-- <tree></tree> -->
    </custom-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
