const whiteList = ['/login', '/404', '401']

// 不在白名單內可以被保存 tagsView
export const isTags = (path) => {
  return !whiteList.includes(path)
}
