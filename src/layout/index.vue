<script setup lang="ts" name="layout">
import { Navbar, AppMain, Sidebar, TagsView } from './components'
</script>

<template>
  <div class="layout-wrap">
    <div class="lf-wrap">
      <sidebar />
    </div>
    <div class="rt-wrap">
      <navbar />
      <tags-view />
      <app-main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  .lf-wrap {
    flex: 0 0 auto;
  }
  .rt-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
