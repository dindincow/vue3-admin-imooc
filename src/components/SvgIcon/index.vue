<template>
  <!-- 外部展示圖標 -->
  <div
    v-if="isExternal"
    class="svg-icon svg-external-icon"
    :style="styleExternalIcon"
    :class="className"
  ></div>
  <!-- 內部展示圖標 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { isExternal as external } from '@/utils/validate'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  }
})

// 判斷是否為外部圖標
const isExternal = computed(() => external(props.icon))

// 外部圖標樣式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

// 內部圖標
const iconName = computed(() => `#icon-${props.icon}`)

console.log('props', props)
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
