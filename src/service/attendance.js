import * as API from '../config/resource'
import axios from '../config/axios.config'

export default {
  getAttendance (studentId, date) {
    return axios.get(API.FETCH_ATTENDANCE, {studentId, date})
  }
}
