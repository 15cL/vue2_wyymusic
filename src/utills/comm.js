
// 获取时间
export const getDate = (timeStamp, needYear = false) => {
  if (!timeStamp) {
    return false
  }
  const date = new Date(timeStamp)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  if (needYear) {
    return Y + '年' + M + '月' + D + '日'
  }
  return M + '月' + D + '日'
}

// 获取歌手
export const artistsFilter = (artists) => {
  let res = ''
  if (artists.length === 1) {
    return artists[0].name
  }
  artists.forEach((el, index) => {
    if (index < artists.length - 1) {
      res += el.name + ' / '
    } else {
      res += el.name
    }
  })
  return res
}

// 解析歌词
export const resolveLyric = function (lyc) {
  const regNewLine = /\n/
  const lycArr = lyc.split(regNewLine)
  // 转对象数组
  return transformToObjArr(lycArr)
}

function transformToObjArr (lycArr) {
  const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
  return lycArr.map((v, index) => {
    if (v === '') {
      return {}
    }
    const timeMap = v.match(regTime)
    if (!timeMap[0]) {
      return false
    }
    const lineLyc = String(v.split(']')[1]).trim()

    return {
      time: timeMap[0] ? resolveTime(timeMap[0]) : '',
      lyc: lineLyc,
      uid: index + 2
    }
  })
}

function resolveTime (tm) {
  const time = tm.slice(1, tm.length - 1)
  const regMin = /.*:/
  const regSec = /:.*\./
  const regMs = /\..*/
  const min = parseInt(time.match(regMin)[0].slice(0, 2))
  let sec = parseInt(time.match(regSec)[0].slice(1, 3))
  const ms = parseInt(time.match(regMs)[0].slice(1))
  if (min) {
    sec += 60 * min
  }
  return `${sec}.${ms}`
}
