<script setup lang="ts" name="icon">
type Props = {
  icon?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'IconMenu',
})
</script>

<template>
  <el-icon>
    <component :is="icon" />
  </el-icon>
</template>
