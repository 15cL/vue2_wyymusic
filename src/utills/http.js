import request from './request'

const http = {
  get (url, params) {
    const config = {
      method: 'get',
      url: String(url).slice(4)
    }
    if (params)config.params = params
    return request(config)
  },
  post (url, params) {
    const config = {
      method: 'post',
      url: String(url).slice(4)
    }
    if (params)config.data = params
    return request(config)
  }
}

export default http
