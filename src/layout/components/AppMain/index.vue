<template>
  <div class="app-main">
    <div class="demo-pagination-block">
      <div class="demonstration">All combined</div>
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.app-main{
  min-height:calc(100vh - 50px);
  width:100%;
  position:relative;
  overflow: hidden;
  padding:61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
