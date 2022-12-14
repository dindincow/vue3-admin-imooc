<template>
  <!-- $attrs獲取父組件屬性，並綁定到該組件的根元素，會直接綁在 el-dropdown 標籤上-->
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSelectTheme">

    <!-- 圖標 -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon icon="change-theme"></svg-icon>
      </el-tooltip>
    </div>

    <!-- 下拉選單 -->
    <template #dropdown>
      <el-dropdown-menu command="color">
        <el-dropdown-item>{{$t('msg.theme.themeChange')}}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 選擇顏色彈框 -->
  <SelectColor v-model="selectColorVisable"></SelectColor>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

const selectColorVisable = ref(false)
const handleSelectTheme = (command) => {
  selectColorVisable.value = true
}
</script>

<style scoped lang="scss">
.theme{

}
</style>
