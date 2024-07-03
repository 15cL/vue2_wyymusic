import http from '../utills/http'

export const getSongList = async () => {
  return await http.get('/api/top/playlist/highquality?limit=6')
}

export const getNewSong = async () => {
  return await http.get('/api/top/song?type=0')
}
