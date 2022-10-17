/**
 * svgRequire 是一個涵數，接收 request 參數，用於 require 導入
 * svgRequire 提供3個屬性， svgRequire.key() 獲得所有 svg 圖示
 * 便利圖標，把圖標當 request 參數，傳入到 svgRequire 中，來完成本地 svg 圖標導入
 */
import SvgIcon from '@/components/SvgIcon'

// 1. 導入所有svg 圖標
const svgRequire = require.context('./svg', false, /\.svg$/)
console.log(svgRequire.keys())
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

// 2. 完成全局註冊
export default app => {
  app.component('svg-icon', SvgIcon)
}

// 3.此時寫到這邊，svgIcon 還會無法使用，需安裝svg loader
