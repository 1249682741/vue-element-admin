<template>
  <div class="inline">
    <el-scrollbar wrap-class="layout-main-scrollbar-wrap">
      <main class="layout-main-wrap">
        <router-view />
      </main>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .layout-main-scrollbar-wrap {
  height: calc(100vh - $layout-navbar-height - $layout-tags-view-height);
}
.layout-main-wrap {
  padding: 15px;
}
</style>
