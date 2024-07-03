import { getNewSong, getSongList } from '../api/recommd'

const recommd = {
  namespaced: true,
  state: {},
  mutations: {

  },
  actions: {
    // 获取歌单
    async getSongList () {
      return await getSongList()
    },
    // 获取新歌
    async getNewSong () {
      return await getNewSong()
    }
  }
}

export default recommd
