import md5 from 'md5'
import { login } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
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
    }
  }
}
