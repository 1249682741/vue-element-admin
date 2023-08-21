<template>
  <el-dropdown class="button-more">
    <el-button circle type="primary" icon="More" title="更多" />
    <template #dropdown>
      <el-dropdown-menu>
        <slot />
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-button + .button-more {
  margin-left: 10px;
}
</style>
