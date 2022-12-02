import { Ref, ref, watchEffect } from 'vue'
import { type TagView } from '@/store'

type refWithNoInitialValue<T> = Ref<T | undefined>

type useMenuOptions = {
  selectedTag: refWithNoInitialValue<TagView>
}

export default function useMenu({ selectedTag }: useMenuOptions) {
  const visible = ref<boolean>(false)
  const left = ref<number>(0)
  const top = ref<number>(0)

  /**
   * 隐藏菜单
   */
  const closeMenu = () => {
    visible.value = false
  }

  /**
   * 打开菜单
   * @param tag
   * @param e
   */
  const openMenu = (tag: TagView, e: MouseEvent) => {
    const menuMinWidth = 85
    let maxWidth = document.body.offsetWidth
    const maxLeft = maxWidth - menuMinWidth

    left.value = e.clientX > maxLeft ? maxLeft : e.clientX
    top.value = e.clientY
    visible.value = true
    selectedTag.value = tag
  }

  watchEffect(() => {
    if (visible.value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  })

  return {
    visible,
    closeMenu,
    openMenu,
    left,
    top,
  }
}
