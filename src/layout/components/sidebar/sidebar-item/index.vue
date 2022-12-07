<script setup lang="ts" name="sidebar-item">
import { ref } from 'vue'
import { type CustomerRouteRecordRaw } from '@/router'
import SidebarIcon from '../icon/index.vue'
import SidebarLink from '../link/index.vue'
import { isExternal } from '@/utils/validate'
import { resolve } from '@/utils'

type Props = {
  item: CustomerRouteRecordRaw
  basePath: string
}
const props = withDefaults(defineProps<Props>(), {
  basePath: '',
})

const isSingleRoute = ref<boolean>(true)
const singleRoute = ref<CustomerRouteRecordRaw>(props.item)
const multipleRoute = ref<CustomerRouteRecordRaw>(props.item)
const currentPath = ref<string>('')

const init = (route: CustomerRouteRecordRaw, basePath: string) => {
  // 若路由为 hidden 则 直接return
  if (route.hidden) return
  let resolvePath = resolve(basePath, route.path)

  // 没有 chilren 或者 children 的长度为 0 的情况 直接展示单节点
  if (!route.children || route.children.length == 0) {
    isSingleRoute.value = true
    singleRoute.value = route
    currentPath.value = isExternal(route.path) ? route.path : resolvePath
    return
  }

  // 下面是有 children 的情况
  // 当下子孩的长度为 1 且 当前节点 alwaysShow 不为 true, 则直接展示单节点
  if (route.children.length == 1 && !route.alwaysShow) {
    init(route.children[0] as CustomerRouteRecordRaw, resolvePath)
  } else {
    // 子孩长度大于 1 或 当前节点是 alwaysShow 的情况, 则直接展示多节点
    isSingleRoute.value = false
    multipleRoute.value = route
    currentPath.value = resolvePath
  }
}

init(props.item, props.basePath)
</script>

<template>
  <template v-if="!item.hidden">
    <sidebar-link v-if="isSingleRoute" :to="currentPath">
      <el-menu-item :index="currentPath">
        <sidebar-icon :icon="singleRoute?.meta?.icon" />
        <template #title>
          <span>{{ singleRoute?.meta?.title }}</span>
        </template>
      </el-menu-item>
    </sidebar-link>

    <el-sub-menu v-else :index="currentPath">
      <template #title>
        <sidebar-icon :icon="multipleRoute?.meta?.icon" />
        <span>{{ multipleRoute?.meta?.title }}</span>
      </template>
      <sidebar-item v-for="child in multipleRoute.children" :key="`${child.path}`" :item="child" :basePath="currentPath" />
    </el-sub-menu>
  </template>
</template>
