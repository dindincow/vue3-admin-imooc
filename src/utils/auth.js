import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

// 獲取時間蹉
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}
// 設置時間蹉
export function setTimeStamp() {
  return setItem(TIME_STAMP, Date.now())
}
// 是否超時
export function isCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  // 當前時間 - 緩存(登入)時間 > token 過期時間(2小時) : 代表登入超時
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
