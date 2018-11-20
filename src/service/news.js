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
  getNewsList (studentId, currentid, number) {
    return axios.get(API.FETCH_NEWS_LIST, {studentId, currentid, number, order: -1}, {})
  },
}
