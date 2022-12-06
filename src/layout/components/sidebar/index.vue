<script setup lang="ts" name="sidebar">
import { ref } from 'vue'
import SidebarItem from './sidebar-item/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppSettingStore } from '@/store'
import { storeToRefs } from 'pinia'

const appSettingStore = useAppSettingStore()
const { isMenuCollapse } = storeToRefs(appSettingStore)
const route = useRoute()
const router = useRouter()
const routes = ref(router.options.routes)
</script>

<template>
  <el-menu class="layout-menu-wrap" mode="vertical" :default-active="route.path" :collapse="isMenuCollapse">
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" />
  </el-menu>
</template>

<style scoped lang="scss">
$menu-width: 230px;
.layout-menu-wrap {
  width: $menu-width;
  min-height: 100%;
  overflow-x: hidden;
  &.el-menu--collapse {
    width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
  }
}
</style>
