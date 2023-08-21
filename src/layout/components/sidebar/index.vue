<script setup lang="ts" name="sidebar">
import { ref } from 'vue'
import SidebarItem from './sidebar-item/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppSettingStore, useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const appSettingStore = useAppSettingStore()
const { isMenuCollapse } = storeToRefs(appSettingStore)
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()
const routes = [...router.options.routes, ...userStore.routes]
</script>

<template>
  <div class="inline">
    <el-scrollbar height="100vh">
      <el-menu class="layout-menu-wrap" mode="vertical" :default-active="route.path" :collapse="isMenuCollapse">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.layout-menu-wrap {
  width: $layout-menu-width;
  min-height: 100vh;
  &.el-menu--collapse {
    width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
  }
}
</style>
