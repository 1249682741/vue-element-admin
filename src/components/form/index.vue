<script lang="ts" setup>
import { IBaseConfig } from './type'

interface Props {
  config: IBaseConfig
  data: any
}

defineProps<Props>()
</script>

<template>
  <el-form>
    <el-form-item v-for="item in config" :key="item.prop">
      <el-input></el-input>
    </el-form-item>
  </el-form>
</template>
