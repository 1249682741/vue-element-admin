<template>
  <div class="tags-view-wrap">
    <el-scrollbar view-style="display: flex; flex-direction: row" @scroll="closeMenu" ref="scrollbarRef">
      <router-link
        ref="tagRef"
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="{
          path: tag.path,
          query: tag.query,
        }"
        custom
        v-slot="{ navigate, isActive }"
      >
        <span
          class="tags-view-item"
          :class="{ active: isActive }"
          @click="navigate"
          @click.middle.prevent.native="!isAffix(tag) && closeSelectedTag(tag)"
          @contextmenu.prevent.native="openMenu(tag, $event)"
        >
          {{ tag?.meta?.title }}
          <el-icon v-if="!isAffix(tag)" class="icon-close" :size="12" @click.prevent.stop="closeSelectedTag(tag)">
            <Close />
          </el-icon>
        </span>
      </router-link>
    </el-scrollbar>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag as TagView)">刷新</li>
      <li v-if="!isAffix(selectedTag as TagView)" @click="closeSelectedTag(selectedTag as TagView)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag as TagView)">全部关闭</li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="tags-view">
import { TagView } from '@/store'
import { onMounted, watch } from 'vue'
import useMenu from './useMenu'
import useTagView from './useTagView'
import { useRoute } from 'vue-router'

const route = useRoute()

const {
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
} = useTagView()

const { visible, closeMenu, openMenu, left, top } = useMenu({ selectedTag })

watch(
  () => route,
  () => {
    addTags()
    moveToCurrentTag()
  },
  {
    deep: true,
  }
)

onMounted(() => {
  initTags()
  addTags()
})
</script>

<style scoped lang="scss">
$tags-view-active-bg: #42b983;
.tags-view-wrap {
  width: 100%;
  height: 34px;
  background: #fff;
  box-shadow: 0 1px 3px 0 #0000001f, 0 0 3px 0 rgb(0 0 0 / 4%);
  .tags-view-item {
    flex: 0 0 auto;
    margin: 4px 0 0 5px;
    padding: 0 8px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #495060;
    border: 1px solid #d8dce5;
    background: #fff;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:first-of-type {
      margin-left: 15px;
    }
    &.active {
      color: #fff;
      border-color: $tags-view-active-bg;
      background-color: $tags-view-active-bg;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    .icon-close {
      margin: 0 0 0 5px;
      border-radius: 50%;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
