<template>
  asdas-{{ $store.getters.language }}
  <el-config-provider :locale="$store.getters.language === 'en' ? en : zh">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
</script>

<style></style>
