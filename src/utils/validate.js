// 判斷是否為外部資源
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
