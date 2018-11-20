import * as API from '../config/resource'
import axios from '../config/axios.config'

export default {
  getAssessmentList (studentId, classId) {
    return axios.get(API.FETCH_ASSESSMENT_LIST, {studentId, classId})
  },

  getAssessment (studentId, id) {
    return axios.get(API.FETCH_ASSESSMENT, {studentId, student_subject_id: id})
  }
}
