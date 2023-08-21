<template>
  <el-input v-model="modelValue" placeholder="图形验证码">
    <template #suffix>
      <div class="code-img" @click="loadImageData">
        <img :src="image" />
      </div>
    </template>
  </el-input>
</template>

<script lang="ts" setup name="input-img-code">
import { onMounted, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { fetchImgCode } from '@/api/auth'

const props = defineProps<{
  modelValue: string
  codeKey: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
  (e: 'update:codeKey', codeKey: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits)
const codeKey = useVModel(props, 'codeKey', emits)

const image = ref('')

async function loadImageData() {
  let imgCodeResult = { image: '', key: '' }
  try {
    const result = await fetchImgCode()
    var base64 = window.btoa(
      new Uint8Array(result.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte)
      }, '')
    )
    imgCodeResult.image = 'data:image/png;base64,' + base64
    imgCodeResult.key = result.headers.transid
  } catch (err) {
    console.log('getImgCode err', err)
  } finally {
    image.value = imgCodeResult.image
    codeKey.value = imgCodeResult.key
  }
}

onMounted(() => {
  loadImageData()
})
</script>

<style lang="scss" scoped>
.code-img {
  width: 82px;
  height: 30px;
  border-left: 1px solid #dcdfe6;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
