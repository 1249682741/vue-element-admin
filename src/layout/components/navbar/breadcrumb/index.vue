<script lang="ts" setup name="breadcrumb">
import { watchEffect, ref } from 'vue'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'

const route = useRoute()
const router = useRouter()
const levelList = ref<RouteLocationMatched[]>([])

watchEffect(() => {
  levelList.value = route.matched.filter((item) => item.meta && item.meta.title)
})
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span class="not-redirect">
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.not-redirect {
  color: #97a8be;
}
</style>
