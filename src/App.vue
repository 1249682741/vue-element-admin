<template>
  <el-config-provider :locale="zhCN">
    <Suspense>
      <router-view />
    </Suspense>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
</script>
