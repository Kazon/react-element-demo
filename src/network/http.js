import axios from 'axios'
import { showLoading, hideLoading } from './loading';
import { message } from 'antd';

// const BASEURL = 'http://localhost:8080/'
const BASEURL = 'http://elm.cangdu.org'

let loadingInstance


const http = axios.create({
  baseURL: BASEURL,
  timeout: 30000,
  ContentType: 'application/json',
  withCredentials: true, //跨域允许传输cookie
})

http.interceptors.request.use(
  config => {
    // loading
    if(config.loading && !loadingInstance){
      loadingInstance = showLoading(loadingInstance)
    }
    // add token
    // const token = getToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


http.interceptors.response.use(
  response => {
    loadingInstance = hideLoading(loadingInstance)
    return response.data
  },
  error => {
    loadingInstance = hideLoading(loadingInstance)
    console.log(error)
    message.error(error)
    Promise.reject(error)
  }
)

export default http
