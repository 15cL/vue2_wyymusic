import request from './request'

const http = {
  get (url, params) {
    const config = {
      method: 'get',
      url
    }
    if (params)config.params = params
    return request(config)
  },
  post (url, params) {
    const config = {
      method: 'post',
      url
    }
    if (params)config.data = params
    return request(config)
  }
}

export default http
