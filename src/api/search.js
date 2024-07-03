import http from '../utills/http'

export const getHotSearch = async () => {
  return http.get('/api/search/hot')
}

export const getSearchSuggest = async (key) => {
  return await http.get('/api/search/suggest', { keywords: key, type: 'mobile' })
}

export const getSearchMultimatch = async (key) => {
  return await http.get('/api/search/multimatch', { keywords: key })
}

export const getSearchList = async (key, offset) => {
  return await http.get('/api/search', { keywords: key, limit: 20, offset })
}
