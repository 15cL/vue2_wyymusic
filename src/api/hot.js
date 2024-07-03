import http from '../utills/http'

export const getHotRank = async () => {
  return await http.get('/api/playlist/detail?id=3778678')
}
