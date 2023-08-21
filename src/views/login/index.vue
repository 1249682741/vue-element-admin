<template>
  <main>
    <h4>登录</h4>
    <el-form label-width="100" size="small">
      <el-form-item label="用户名">
        <el-input v-model="formData.userName" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'login',
})

const formData = reactive({
  userName: '',
  password: '',
})

function submit() {
  console.log(formData)
}
</script>
