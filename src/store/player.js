import { getSongUrl, getSongCheck, getSongLyric, getSongComments, getSongSimi, getListSimi } from '../api/player'

const player = {
  namespaced: true,
  state: {},
  mutations: {

  },
  actions: {

    // 获取歌曲url
    async getSongUrl (state, id) {
      return await getSongUrl(id)
    },
    // 获取音乐是否可用
    async getSongCheck (state, id) {
      return await getSongCheck(id)
    },
    // 获取歌词
    async getSongLyric (state, id) {
      return await getSongLyric(id)
    },
    // 获取歌曲热评
    async getSongComments (state, id) {
      return await getSongComments(id)
    },
    // 获取相似歌曲
    async getSongSimi (state, id) {
      return await getSongSimi(id)
    },
    // 获取相似歌单
    async getListSimi (state, id) {
      return await getListSimi(id)
    }
  }
}

export default player
