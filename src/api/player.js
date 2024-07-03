import http from '../utills/http'

// 获取音乐url
export const getSongUrl = (id) => {
  return http.get('/api/song/url', { id })
}

// 获取音乐是否可用
export const getSongCheck = (id) => {
  return http.get('/api/check/music', { id })
}

// 获取歌词
export const getSongLyric = (id) => {
  return http.get('/api/lyric', { id })
}

// 获取歌曲评论
export const getSongComments = (id) => {
  return http.get('/api/comment/hot', { id, limit: 5, type: 0 })
}

// 获取相似歌曲
export const getSongSimi = (id) => {
  return http.get('/api/simi/song', { id })
}

// 获取相似歌单
export const getListSimi = (id) => {
  return http.get('/api/simi/playlist', { id })
}
