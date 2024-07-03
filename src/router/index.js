import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)

const fam = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return fam.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('../views/playlist/PlayList.vue')
  },
  {
    path: '/player',
    name: 'player',
    component: () => import('../views/player/player.vue'),
    beforeEnter: async (to, from, next) => {
      const isPlay = await store.dispatch('player/getSongCheck', to.query.id)
      if (!isPlay.data.success) {
        Vue.prototype.$toast(isPlay.data.message)
        return isPlay.data.message
      }
      next()
    }
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../components/loading/loading.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
