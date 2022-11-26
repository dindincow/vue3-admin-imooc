import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
const messages = {
  en: {
    msg: {
      test: 'hello world',
      ...enLocale
    }
  },
  zh: {
    msg: {
      test: '你好世界',
      ...zhLocale
    }
  }
}

const locale = 'zh'

// i18N基本配置
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n
