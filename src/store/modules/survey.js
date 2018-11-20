import survey from '../../service/survey'

const state = {
  surveyList: {},
  page: 0,
  size: 10
}

const getters = {
  surveyList: (state, getters) => {
    return state.surveyList[getters.id] || []
  },
  id: (state, getters, rootState, rootGetters) => {
    return (rootGetters['user/currentChild'] && rootGetters['user/currentChild'].id) || ''
  }
}

const actions = {
  /**
   * 获取问卷调查列表
   * @param commit
   * @param data
   * @returns {Promise<any>}
   */
  getSurveyList ({ commit, state, getters }, data) {
    let studentId = getters.id
    return new Promise(async (resolve, reject) => {
      try {
        let res = await survey.getSurveyList(studentId, state.page)
        if (res && res.data && res.data.status !== 0) {
          resolve()
          commit('GET_SURVEY_LIST_SUCCESS', {studentId, result: res && res.data})
        } else {
          reject(res.detail)
        }
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }
}

const mutations = {
  GET_SURVEY_LIST_SUCCESS (state, data) {
    let {studentId, result} = data
    state.surveyList[studentId] = state.surveyList[studentId] || []
    if (state.page === 0) {
      state.surveyList[studentId] = result
    } else {
      state.surveyList[studentId] = state.surveyList[studentId].concat(result)
    }
    state.page++
    state.surveyList = {...state.surveyList}
  },
  INIT_PAGE (state) {
    state.page = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
