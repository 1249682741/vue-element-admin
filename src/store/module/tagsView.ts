import { defineStore } from 'pinia'
import { RouteRecordName } from 'vue-router'
import { CustomerRouteMeta } from '@/router'

export type TagView = {
  fullPath?: string
  path: string
  name: RouteRecordName | undefined | null
  meta: CustomerRouteMeta
  title?: string
  [propName: string]: any
}

type TagsViewState = {
  visitedViews: TagView[]
  cachedViews: RouteRecordName[]
}

export const useTagsViewStore = defineStore({
  id: 'TagView',
  state(): TagsViewState {
    return {
      visitedViews: [],
      cachedViews: [],
    }
  },
  actions: {
    addView(view: TagView) {
      this.addVisitedView(view)
      this.addCacheView(view)
    },
    addVisitedView(view: TagView) {
      if (this.visitedViews.some((v) => v.path == view.path)) return
      this.visitedViews.push({ ...view, title: view.meta.title || 'no-name' })
    },
    addCacheView(view: TagView) {
      if (!view.name || this.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },
    delView(view: TagView) {
      this.delVisitedView(view)
      this.delCacheView(view)
    },
    delVisitedView(view: TagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path == view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    delCacheView(view: TagView) {
      this.cachedViews = this.cachedViews.filter((i) => i != view.name)
    },
    delOthersViews(view: TagView) {
      this.delOthersVisitedViews(view)
      this.delOthersCacheViews(view)
    },
    delOthersVisitedViews(view: TagView) {
      this.visitedViews = this.visitedViews.filter((v) => v.meta.affix || v.path == view.path)
    },
    delOthersCacheViews(view: TagView) {
      if (!view.name) return
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        this.cachedViews = []
      }
    },
    delAllViews() {
      this.delAllVisitedViews()
      this.delAllCacheViews()
    },
    delAllVisitedViews() {
      const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
      this.visitedViews = affixTags
    },
    delAllCacheViews() {
      this.cachedViews = []
    },
    updateVisitedView(view: TagView) {
      for (let v of this.visitedViews) {
        if (v.path == view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
})
