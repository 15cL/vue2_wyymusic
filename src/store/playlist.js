import { getPlaylistDetail, getPlaylistComment } from '@/api/playlist'

const playList = {
  namespaced: true,
  state: {},
  mutations: {

  },
  actions: {
    // 获取歌单详情
    async getPlaylistDetail (state, id) {
      return await getPlaylistDetail(id)
    },
    // 获取歌单评论
    async getPlaylistComment (state, id) {
      return await getPlaylistComment(id)
    }
  }
}

export default playList
