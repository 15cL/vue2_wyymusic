import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/comm.css'
import './assets/css/font.css'

import './plugin/vant.js'
import './utills/autoSize'
import { Toast } from 'vant'

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
