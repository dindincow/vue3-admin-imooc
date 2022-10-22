import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 全局樣式
import './styles/index.scss'

// 導入 SVG 圖標
import installIcons from './icons/index'

// 導入權限
import './permission'

const app = createApp(App)

installElementPlus(app)
installIcons(app)

app.use(store).use(router).mount('#app')
