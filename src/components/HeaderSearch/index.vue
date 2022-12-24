<template>
  <div :class="{ show: isShow }" class="header-search" @click.stop="onShowClick">
    <svg-icon
      class-name="search-icon"
      icon="search"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOption"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters } from '@/utils/routes'
import { generateRoutes } from './fuseData'
import { watchSwitchLang } from '@/utils/i18n'
import Fuse from 'fuse.js'

let fuse
const isShow = ref(false)
const search = ref('')
const router = useRouter()
const searchOption = ref([])
const headerSearchSelectRef = ref(null)

// 監控 isShow 屬性
watch(isShow, val => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 搜索資料源
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

// 關閉搜索框
const onClose = () => {
  isShow.value = false
  searchOption.value = []
}

// 搜索相關
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
    // 是否依照優先排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool.value)

// 顯示搜索框
const onShowClick = () => {
  isShow.value = !isShow.value
}

// 模糊搜索
const querySearch = (query) => {
  if (query !== '') {
    searchOption.value = fuse.search(query)
  } else {
    searchOption.value = []
  }
}

// 選擇後跳轉路由
const onSelectChange = val => {
  router.push(val.path)
}

// 國際化處理
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
})

</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
