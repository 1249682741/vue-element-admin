<script setup lang="ts">
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCN">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
