<script setup lang="ts">
import { computed } from 'vue'
import { useAppSettingStore, useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import Breadcrumb from './breadcrumb/index.vue'

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
    <div class="lf-wrap">
      <el-icon class="icon" :size="25" color="#333" @click="appSettingStore.toggleMenuStatus">
        <component :is="iconName" />
      </el-icon>
      <breadcrumb />
    </div>
    <div>
      <el-dropdown>
        <p class="dropdown-wrap">
          <span class="name">
            {{ userName }}
          </span>
          <el-icon>
            <arrow-down />
          </el-icon>
        </p>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userStore.logout">修改信息</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="userStore.logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav-wrap {
  padding: 0 15px;
  height: $layout-navbar-height;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.lf-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  .icon {
    margin: 0 20px 0 0;
  }
}
.dropdown-wrap {
  display: flex;
  flex-direction: row;
  span {
    margin: 0 10px 0 0;
  }
}
</style>
