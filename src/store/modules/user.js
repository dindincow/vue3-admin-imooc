import md5 from 'md5'
import router from '@/router'
import { login, getUserInfo } from '@/api/sys'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        // 發請求打ＡＰＩ
        login({ username, password: md5(password) })
          .then(data => {
            this.commit('user/setToken', data.token)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
      })
    },
    async getUserInfo(context) {
      const result = await getUserInfo()
      this.commit('user/setUserInfo', result)
      return result
    },
    async logout(context) {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // TODO 權限相關配置
      router.push('/login')
    }
  }
}
