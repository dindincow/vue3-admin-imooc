import path from 'path'
import i18n from '@/i18n'
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let res = []
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 當 meta 存在時，使用 i18n 解析國際化數據，組合成新的 title 內容
    // 動態路由不允許被搜索
    // 匹配動態路由的正則
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }

    // 存在 children 時，迭代調用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
