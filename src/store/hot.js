import { getHotRank } from '../api/hot'

const hotRank = {
  namespaced: true,
  state: {

  },
  mutations: {

  },
  actions: {
  // 获取热榜
    async getHotRank () {
      return await getHotRank()
    }
  }
}
export default hotRank
