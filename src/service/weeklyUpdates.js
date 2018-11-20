import * as API from '../config/resource'
import axios from '../config/axios.config'

export default {
  /**
   * 获取每周更新
   * @param studentId 学生ID
   * @param ?currentId 最后一个元素的id
   * @param size
   * @returns {*}
   */
  getWeeklyUpdates (studentId, currentid, size) {
    return axios.get(API.FETCH_WEEKLY_UPDATE, {studentId, currentid, number: size, order: -1})
  }
}
