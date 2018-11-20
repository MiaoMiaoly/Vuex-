import * as API from '../config/resource'
import axios from '../config/axios.config'

export default {
  /**
   * 获取活动列表
   * @param currentId
   * @param pageSize
   * @returns {*}
   */
  getActivityList (currentid, pageSize) {
    return axios.save(API.FETCH_ACTIVITY_LIST, {currentid, page_size: pageSize})
  },

  getActivityListV2 (studentId, currentid, pageSize) {
    return axios.get(API.FETCH_ACTIVITY_LIST_V2, {studentId, currentid, number: pageSize})
  }
}
