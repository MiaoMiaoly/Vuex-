import assessmentService from '../../service/assessment'

const state = {
  assessmentList: {}
}

const getters = {
  assessmentList: state => state.assessmentList
}

const actions = {
  /**
   * 获取评估活动列表
   * @param commit
   * @param data
   * @returns {Promise<any>}
   */
  getAssessmentList ({commit}, data) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await assessmentService.getAssessmentList(52255, 2295)
        if (res && res.data && res.data.status === 1) {
          resolve()
          commit('GET_ASSESSMENT_LIST_SUCCESS', res && res.data && res.data.years)
        } else {
          reject(res.detail)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
}

const mutations = {
  GET_ASSESSMENT_LIST_SUCCESS (state, data) {
    state.assessmentList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
