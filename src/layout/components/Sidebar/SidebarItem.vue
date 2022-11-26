<template>
  <!-- menu 菜單 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>

    <!-- 渲染子菜單 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    >asd</sidebar-item>
  </el-sub-menu>

  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem'
import { defineProps } from 'vue'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
