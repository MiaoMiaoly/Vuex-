import * as API from '../config/resource'
import axios from '../config/axios.config'

export default {
  getMessage (studentId, currentId) {
    return axios.get(API.FETCH_CHAT_HISTORY, {studentId, before: currentId})
  },

  sendMessage (studentId, content) {
    return axios.save(API.SAVE_CHAT, {}, {content, student: studentId})
  }
}
