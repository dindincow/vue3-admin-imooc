<template>
  <div class="tags-view-container">
    <router-link
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
      @contextmenu.prevent="openMenu($event, index)"
      >
    {{ tag.title }}
    <!-- <i v-show="!isActive(tag)" class="el-icon-close" @click.prevent.stop="onCloseClick(index)"/> -->
    <span class="close" v-show="!isActive(tag)" @click.prevent.stop="onCloseClick(index)">X</span>
    </router-link>

    <!-- 右鍵選單 -->
    <ContextMenu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
      />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContextMenu from './ContextMenu.vue'

const store = useStore()
const route = useRoute()
const visible = ref(false)
const menuStyle = ref({ left: 0, top: 0 })
const selectIndex = ref(0)

watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

// 關閉右鍵選單
const closeMenu = () => {
  visible.value = false
}
// 使否選中當前 tags views
const isActive = tag => {
  return tag.path === route.path
}
// 滑鼠右鍵跳出選單
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}
// 關閉當前
const onCloseClick = index => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .close,.el-icon-close {
      float: right;
      margin-top: 5px;
      width: 16px;
      height: 16px;
      line-height: 12px;
      display: flex;
      font-size: 12px;
      font-weight: 500;
      margin-left: 5px;
      background: #e3e3e3;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
