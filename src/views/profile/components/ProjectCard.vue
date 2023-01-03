<template>
  <div>
    <PanThumb
      :image="$store.getters.userInfo.avatar"
      :height="'100px'"
      :width="'100px'"
    >
      <div>Hello</div>
      {{ $store.getters.userInfo.title }}
    </PanThumb>
  </div>
</template>

<script setup>
import {} from 'vue'
import PanThumb from '@/components/PanThumb'
</script>

<style scoped lang="scss"></style>
