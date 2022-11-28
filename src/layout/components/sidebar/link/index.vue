<script setup lang="ts" name="sidebar-link">
import { ref } from 'vue'
import { isExternal } from '@/utils/validate'
import { RouterLinkProps } from 'vue-router'
type Props = {
  to: string
}
type AnchorAttribute = {
  href: string
  [PropsName: string]: string
}
type LinkAttribute = RouterLinkProps | AnchorAttribute
const props = defineProps<Props>()

// 默认非外链
const type = ref<string>('router-link')
const linkProps = ref<LinkAttribute>({ to: props.to })

const init = () => {
  if (!isExternal(props.to)) return
  type.value = 'a'
  linkProps.value = {
    href: props.to,
    target: '_blank',
    rel: 'noopener',
  }
}
init()
</script>

<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>
