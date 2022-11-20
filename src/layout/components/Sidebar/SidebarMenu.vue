<template>
  <!-- 一级 menu -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/routes'

import SidebarItem from './SidebarItem.vue'

const router = useRouter()
console.log('路由攤平=======>', router.getRoutes())
const routes = computed(() => {
  // 獲取不重複路由
  const fRoutes = filterRouters(router.getRoutes())
  // 產生左邊選單
  return generateMenus(fRoutes)
})
console.log('最後路遊結果============>', JSON.stringify(routes.value))

// 默認菜單高亮
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
