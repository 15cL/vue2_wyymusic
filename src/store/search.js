
import {
  getHotSearch,
  getSearchList,
  getSearchMultimatch,
  getSearchSuggest
} from '@/api/search'

const search = {
  namespaced: true,
  state: {},
  mutations: {

  },
  actions: {
    // 获取热搜
    async getHotSearch () {
      return await getHotSearch()
    },
    // 获取搜索建议
    async getSearchSuggest (state, key) {
      return await getSearchSuggest(key)
    },
    // 获取搜素结果
    async getSearchMultimatch (state, key) {
      return await getSearchMultimatch(key)
    },
    // 获取搜索列表
    async getSearchList (state, obj) {
      return await getSearchList(obj.key, obj.offset)
    }
  }
}

export default search
