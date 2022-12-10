<script setup lang="ts" name="layout">
import { Navbar, AppMain, TagsView, Sidebar } from './components'
</script>

<template>
  <div class="layout-wrap">
    <sidebar />
    <div class="layout-content-wrap">
      <navbar />
      <tags-view />
      <app-main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-wrap {
  display: flex;
  overflow: hidden;
  .layout-content-wrap {
    flex: 1;
    overflow: hidden;
  }
}
</style>
