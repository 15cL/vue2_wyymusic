import http from '../utills/http.js'

// 获取歌单详情
export const getPlaylistDetail = async (id) => {
  return await http.get('/api/playlist/detail', { id })
}

// 获取歌单评论
export const getPlaylistComment = async (id) => {
  return await http.get('/api/comment/playlist', { id, limit: 15 })
}
