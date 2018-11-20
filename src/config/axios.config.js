import axios from 'axios'
import config from './index'

/**
 * request拦截器
 *
 */
axios.defaults.baseURL = config.apiHost;

/**
 * 发送拦截器
 * 1.添加token
 * 2.添加Content-Type
 */
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      let token = 'jwt ' + localStorage.getItem('token')
      config.headers.common['Authorization'] = token  
      console.log(token);
    }
    config.headers.post['Content-Type'] = 'application/json;utf-8'
    return config
  },
  error => {
    return Promise.reject(error)
  })

/**
 * 返回拦截器
 * 1.判断是否错误
 * 2.如果返回401清楚localStorage里token以及user的值
 */
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          return Promise.reject(new Error('请重新登录'))
        case 500:
          return Promise.reject(new Error('系统内部错误'))
      }
    }
    return Promise.reject(error.response.data)
  })

function transform (url, params) {
  if (typeof params === 'object') {
    for (let key in params) {
      let index = url.indexOf(`{${key}}`)

      if (index > -1) {
        url = url.replace(`{${key}}`, params[key])
        delete params[key]
      }
    }
  }
  return { url, params }
}

export default {
  get (resource, data) {
    let {url, params} = transform(resource, data)
    return axios.get(url, {params})
  },

  save (resource, data, body) {
    let {url} = transform(resource, data)
    return axios.post(url, body)
  }
}
