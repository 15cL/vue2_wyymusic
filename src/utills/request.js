import axios from 'axios'

const request = axios.create({
  timeout: 20 * 1000,
  baseUrl: process.env.VUE_APP_BASE_API
})

request.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    return Promise.resolve(error.message)
  }
)
export default request
