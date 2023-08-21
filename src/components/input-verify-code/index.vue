<template>
  <el-input v-model="modelValue" placeholder="短信验证码" maxlength="6">
    <template #suffix>
      <div class="code-img" @click="onClick">{{ btnTxt }}</div>
    </template>
  </el-input>
</template>

<script lang="ts" setup name="input-img-code">
import { computed, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { fetchVerifyCode } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { ResponseCode } from '@/constant'
const BaseBtnTxt = '获取验证码'
const WaitSecond = 60
const props = defineProps<{
  modelValue: string
  id: string
  mobile: string
  code: string
  codeKey: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
  (e: 'update:id', id: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits)
const id = useVModel(props, 'id', emits)

const btnTxt = ref(BaseBtnTxt)
let canClick = true

function canSubmit() {
  let message = ''
  let { mobile, code, codeKey } = props
  if (!mobile) {
    message = '请输入手机号码'
  } else if (!code || !codeKey) {
    message = '请输入图形验证码'
  }
  message.length && ElMessage.error({ message })
  return message.length == 0
}

async function onClick() {
  try {
    if (!canClick) return
    if (!canSubmit()) return
    canClick = false
    btnTxt.value = `发送中...`
    let { mobile, code, codeKey } = props
    const result = await fetchVerifyCode({ mobile, code, codeKey })
    if (result.code == ResponseCode.OK) {
      id.value = result.data
      changeBtnTxt()
    } else {
      btnTxt.value = BaseBtnTxt
      ElMessage.error({ message: result.msg })
      canClick = true
    }
  } catch (err) {
    btnTxt.value = BaseBtnTxt
    console.log('fetchVerifyCode err', err)
    canClick = true
  }
}

function changeBtnTxt() {
  let num = WaitSecond
  let timer = setInterval(() => {
    btnTxt.value = `(${--num})秒`
  }, 1000)

  setTimeout(() => {
    clearInterval(timer)
    btnTxt.value = BaseBtnTxt
    canClick = true
  }, WaitSecond * 1000)
}
</script>

<style lang="scss" scoped>
.code-img {
  width: 82px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
  color: #666;
  font-weight: 500;
}
</style>
