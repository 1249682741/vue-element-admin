<template>
  <el-dialog append-to-body v-model="visible" title="修改密码" draggable destroy-on-close width="500px">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="ModifyPassword">
import { ref, watch, nextTick } from 'vue'
import { useVModels } from '@vueuse/core'

type Props = {
  visible: boolean
}
const props = defineProps<Props>()

type Emits = {
  (e: 'update:visible', visible: boolean): void
}
const emits = defineEmits<Emits>()
const { visible } = useVModels(props, emits)


watch(visible, (visible: boolean) => {
  if (!visible) return
})


async function onSubmit() {
  
}
</script>
