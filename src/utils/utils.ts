

import md5 from 'md5'
import dayjs from 'dayjs'

export function md5Code (...props:any) :string {
    return md5(...props)
}

// 类型判断，formatPattern是可选参数，如果不选就是以下格式，也就进行了类型的判断
export function formatTime (time: Date,formatPattern = 'YYYY-MM-DD HH:mm:ss') : string {
  return dayjs(time).format(formatPattern)
}