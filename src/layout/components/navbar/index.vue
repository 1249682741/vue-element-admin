<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppSettingStore, useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const appSettingStore = useAppSettingStore()
const { isMenuCollapse } = storeToRefs(appSettingStore)

const iconName = computed(() => {
  return isMenuCollapse.value ? 'expand' : 'fold'
})

const userStore = useUserStore()
const { userName } = storeToRefs(userStore)
</script>

<template>
  <nav class="nav-wrap">
    <el-icon :size="20" @click="appSettingStore.toggleMenuStatus">
      <component :is="iconName" />
    </el-icon>
    <div>
      <el-dropdown>
        <span>
          {{ userName }}
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userStore.logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav-wrap {
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 1px 0 0 #f8f8f8;
}
</style>
