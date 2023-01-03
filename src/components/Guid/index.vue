<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <span @click="onClick" id="guide-start"><svg-icon icon="guide"/></span>
    </el-tooltip>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './step'
const i18n = useI18n()
let driver = null

onMounted(() => {
  driver = new Driver({
    // 禁止點集蒙板關閉
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style scoped>
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
