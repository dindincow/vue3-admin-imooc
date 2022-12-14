import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeOut } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

// 请求攔截器
service.interceptors.request.use(config => {
  config.headers.icode = 'A526E4B23D3FF563'
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
    // token 過期,則退出登入
    if (isCheckTimeOut()) {
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 響應攔截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    // 要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 業務錯誤
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.code === 401) {
      store.dispatch('user/logout')
    }

    ElMessage.error(error.message) // 提示錯誤信息
    return Promise.reject(error)
  }
)

export default service
