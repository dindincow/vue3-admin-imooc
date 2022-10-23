import router from '@/router'
import store from '@/store'

// 白名單
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1.已登入->不能去login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判斷用戶訊息是否存在,不存在拉取用護訊息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 2.未登入->只能去login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
