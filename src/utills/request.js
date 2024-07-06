import axios from 'axios'
import store from '../store/index'

const request = axios.create({
  timeout: 20 * 1000,
  baseUrl: process.env.VUE_APP_BASE_API
})

request.interceptors.request.use(config => {
  store.commit('showLoading')
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(
  (response) => {
    store.commit('hideLoading')
    return response
  },
  (error) => {
    return Promise.resolve(error.message)
  }
)
export default request
