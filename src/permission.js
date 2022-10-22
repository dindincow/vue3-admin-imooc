import router from '@/router'
import store from '@/store'

// 白名單
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 1.已登入->不能去login
    if (to.path === '/login') {
      next('/')
    } else {
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
