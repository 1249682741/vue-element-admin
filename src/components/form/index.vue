<script lang="ts" setup>
import { IBaseConfig } from './type'
import { isInput, isSelect } from '@/utils/validate'

interface Props {
  config: IBaseConfig
  data: any
}

defineProps<Props>()
</script>

<template>
  <el-form>
    <el-form-item v-for="item in config" :key="item.prop">
      <el-input v-if="isInput(item.type)" />

      <el-select v-if="isSelect(item.type)">
        <el-option v-for="o in item.options" :key="o."></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
