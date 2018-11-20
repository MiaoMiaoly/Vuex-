import * as API from '../config/resource'
import axios from '../config/axios.config'

export default {
  /**
   * 绑定用户
   * @param {string}username
   * @param {string}password
   * @param {string}code
   * @constructor
   */
  bind (username, password, openid) {
    return axios.save(API.BIND_WECHAT_TAIDII, {}, {username, password, openid})
  },

  openid (code) {
    return axios.save(API.GET_OPENID, {}, {code})
  },

  login (openid) {
    return axios.save(API.LOGIN_WECHAT, {}, {openid})
  },

  /**
   * 获取用户信息
   * @param id guardian id
   * @returns {*}
   */
  getProfile (id) {
    return axios.get(API.FETCH_PROFILE, {id})
  },

  /**
   * 获取二维码
   */
  getQrcode () {
    return axios.get(API.FETCH_QRCODE)
  }
}
