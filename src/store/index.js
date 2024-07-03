import Vue from 'vue'
import Vuex from 'vuex'
import hot from './hot'
import player from './player'
import playlist from './playlist'
import recommed from './recommd'
import search from './search'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    searchHistory: JSON.parse(sessionStorage.getItem('searchHistory')) || [],
    currentPlayMsg: JSON.parse(window.sessionStorage.getItem('currentPlayMsg')) || null,
    pageLoadng: false
  },
  getters: {},
  mutations: {
    // 添加到搜索历史列表
    addHistory (state, key) {
      const index = state.searchHistory.findIndex((v) => v === key)
      if (index >= 0) {
        state.searchHistory.splice(index, 1)
      }
      if (state.searchHistory.length >= 10) {
        state.searchHistory.pop()
      }
      state.searchHistory.unshift(key)
      return sessionStorage.setItem(
        'searchHistory',
        JSON.stringify(state.searchHistory)
      )
    },
    // 移除搜索历史列表
    removeHistory (state, index) {
      state.searchHistory.splice(index, 1)
      return sessionStorage.setItem(
        'searchHistory',
        JSON.stringify(state.searchHistory)
      )
    },
    // 设置当前播放歌曲信息
    setCurrentPlayPic (state, obj) {
      state.currentPlayMsg = obj
      window.sessionStorage.setItem('currentPlayMsg', JSON.stringify(obj))
    },
    // 移除当前播放歌曲信息
    removeCurrentPlayPic (state) {
      state.currentPlayMsg = null
      window.sessionStorage.removeItem('currentPlayMsg')
    },
    // 切换隐藏loading
    toggleLoading (state) {
      state.pageLoadng = !state.pageLoadng
    }

  },
  actions: {

  },
  modules: {
    hot,
    player,
    playlist,
    recommed,
    search
  }
})
