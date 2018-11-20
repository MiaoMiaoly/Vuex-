import weekService from '../../service/weeklyUpdates'

const state = {
  updatesList: {},
  pageSize: 10
}

const getters = {
  updatesList: (state, getters) => {
    return state.updatesList[getters.id] || []
  },
  id: (state, getters, rootState, rootGetters) => {
    return (rootGetters['user/currentChild'] && rootGetters['user/currentChild'].id) || ''
  }
}

const actions = {
  /**
   * 获取评估活动列表
   * @param commit
   * @param data
   * @returns {Promise<any>}
   */
  getUpdatesList ({commit, state, getters}, data) {
    let { reset } = data
    let studentId = getters.id
    let updatesList = getters.updatesList
    let currentId = reset ? '' : updatesList.slice(-1)[0] && updatesList.slice(-1)[0].id

    return new Promise(async (resolve, reject) => {
      try {
        let res = await weekService.getWeeklyUpdates(studentId, currentId, state.pageSize)
        if (res.data.status !== 0) {
          resolve()
          commit('GET_UPDATE_LIST_SUCCESS', {studentId, result: res && res.data && res.data.results, reset})
        } else {
          reject(res.data.error_message)
        }
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }
}

const mutations = {
  GET_UPDATE_LIST_SUCCESS (state, data) {
    let { studentId, result, reset } = data
    state.updatesList[studentId] = state.updatesList[studentId] || []
    if (!reset) {
      state.updatesList[studentId] = state.updatesList[studentId].concat(result)
    } else {
      state.updatesList[studentId] = result
    }
    state.updatesList = {...state.updatesList}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
