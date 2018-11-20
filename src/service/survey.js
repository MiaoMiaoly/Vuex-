import * as API from '../config/resource'
import axios from '../config/axios.config'

export default {
  /**
   * 获取调查问卷列表
   * @param studentId
   * @param page
   * @param size
   * @returns {*}
   */
  getSurveyList (studentId, page, size) {
    return axios.get(API.FETCH_SURVEY_LIST, {studentId, page: page, pageSize: size})
  },

  /**
   * 获取调查问卷
   * @param studentId
   * @param surveyId
   */
  getSurvey (studentId, surveyId) {
    return axios.get(API.FETCH_SURVEY, {studentId, survey: surveyId})
  },

  /**
   * 保存调查问卷
   * @param studentId
   * @param data
   * {
   *    @param{Boolean} is_anonymous 是否匿名
   *    @param{String} survey 问卷id
   *    @param{Array} questions 问题对象
   *    [{
   *      @param{String} id 问题id
   *      @param{String|array} answer 选项id | 选项id集合
   *      @param{Number} type 0|1 0:单选 | 1:多选
   *      @param{Boolean} is_required 是否必须
   *    }]
   * }
   * @returns {*}
   */
  saveSurvey (studentId, data) {
    return axios.save(API.SAVE_SURVEY, {studentId}, {is_anonymous: data.is_anonymous, survey: data.survey, questions: data.questions})
  }
}
