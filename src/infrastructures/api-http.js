import axios from 'axios'
import config from '../configs/app.base'

const http = axios.create({
  baseURL: config.baseApiUserUrl
  // Add header or another config here
})
const httpRequest = {
  get (url, params = null) {
    return http.get(url, {'params': params})
  },
  post (url, data = null) {
    return http.post(url, data)
  }
}
export default httpRequest
