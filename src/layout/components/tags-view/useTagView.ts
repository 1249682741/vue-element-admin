import { ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTagsViewStore, type TagView } from '@/store'
import { storeToRefs } from 'pinia'
import { resolve } from '@/utils'

export default function useTagView() {
  const scrollbarRef = ref()
  const tagRef = ref()

  const tagsViewStore = useTagsViewStore()
  const { visitedViews } = storeToRefs(tagsViewStore)

  const affixTags = ref<TagView[]>([])

  const selectedTag = ref<TagView>()

  const router = useRouter()
  const route = useRoute()

  /**
   * 判断tag是否是固定的
   * @param tag
   * @returns Boolean
   */
  const isAffix = (tag: TagView) => !!(tag?.meta && tag.meta.affix)

  /**
   * 判断tag是否是当前活动的
   * @param tag
   * @returns Boolean
   */
  const isActive = (tag: TagView) => route.path == tag.path

  /**
   * 找出路由所有固定的tag
   * @param routes
   * @param basePath
   * @returns tags
   */
  const filterAffixTags = (routes: TagView[], basePath = '/') => {
    let tags: TagView[] = []
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        const tagPath = resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, route.path)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  }

  /**
   * 初始化固定 tag
   */
  const initTags = () => {
    const routes = router.getRoutes()
    let tags = filterAffixTags(routes)
    affixTags.value = tags
    // must have tag name
    for (const tag of tags) {
      tag.name && tagsViewStore.addVisitedView(tag)
    }
  }

  /**
   * 新增 tag
   */
  const addTags = () => {
    if (!route.name) return
    tagsViewStore.addView(route)
  }

  /**
   * 将tag移动到视口
   * @param tagEl 目标tag的元素
   */
  const moveToTarget = (tagEl: HTMLElement) => {
    // 获取tags-view-wrap的总长度
    let tagLeft = tagEl.offsetLeft
    let tagWidth = tagEl.offsetWidth
    let wrap = document.getElementsByClassName('tags-view-wrap')[0] as HTMLElement
    let wrapWidth = wrap.offsetWidth
    console.log(tagLeft, wrapWidth)
    let scroll = tagWidth + tagLeft - wrapWidth
    if (scroll < 0) return
    // scrollbar 移动
    scrollbarRef.value.setScrollLeft(tagLeft - wrapWidth)
  }

  /**
   * 移动到当前显示的Tag
   */
  const moveToCurrentTag = () => {
    nextTick(() => {
      if (!tagRef.value) return
      for (const tag of tagRef.value) {
        if (tag.to.path == route.path) {
          moveToTarget(tag.$el.nextSibling as HTMLElement)
          if (tag.to.fullPath != route.fullPath) {
            tagsViewStore.updateVisitedView(route)
          }
        }
      }
    })
  }

  /**
   * 跳转展示最后一个tag
   * @param visitedViews
   * @param view
   */
  const toLastView = (visitedViews: TagView[], view: TagView) => {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
      router.push(latestView.fullPath as string)
    } else {
      router.push('/')
    }
  }

  /**
   * 刷新页面
   * @param view
   */
  const refreshSelectedTag = (view: TagView) => {
    tagsViewStore.delCacheView(view)
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath,
      })
    })
  }

  /**
   * 关闭选择Tag
   * @param tag
   */
  const closeSelectedTag = (tag: TagView) => {
    tagsViewStore.delView(tag)
    nextTick(() => {
      if (isActive(tag)) {
        toLastView(visitedViews.value, tag)
      }
    })
  }

  /**
   * 关闭其他Tag
   */
  const closeOthersTags = () => {
    if (!selectedTag.value) return
    router.push(selectedTag.value.fullPath as string)
    tagsViewStore.delOthersViews(selectedTag.value)
    moveToCurrentTag()
  }

  /**
   * 关闭所有Tag
   * @param view
   */
  const closeAllTags = (view: TagView) => {
    tagsViewStore.delAllViews()
    if (affixTags.value.some((tag) => tag.path == view.path)) return
    nextTick(() => {
      toLastView(visitedViews.value, view)
    })
  }

  return {
    scrollbarRef,
    tagRef,
    visitedViews,
    selectedTag,
    isAffix,
    initTags,
    addTags,
    closeSelectedTag,
    moveToCurrentTag,
    refreshSelectedTag,
    closeOthersTags,
    closeAllTags,
  }
}
