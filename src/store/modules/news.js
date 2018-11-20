import newsService from '../../service/news'

const state = {
  newsList: {},
  pageSize: 10
}

const getters = {
  newsList: (state, getters) => {
    return state.newsList[getters.id] || []
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
  getNewsList ({commit, state, getters}, data) {
    let { reset } = data
    let studentId = getters.id
    let newsList = getters.newsList
    let currentId = reset ? '' : newsList.slice(-1)[0] && newsList.slice(-1)[0].id

    return new Promise(async (resolve, reject) => {
      try {
        let res = await newsService.getNewsList(studentId, currentId, state.pageSize)
        if (res.data.status !== 0) {
          resolve()
          commit('GET_NEWS_LIST_SUCCESS', {studentId, result: res && res.data && res.data.results, reset})
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
  GET_NEWS_LIST_SUCCESS (state, data) {
    let { studentId, result, reset } = data
    state.newsList[studentId] = state.newsList[studentId] || []
    if (!reset) {
      state.newsList[studentId] = state.newsList[studentId].concat(result)
    } else {
      state.newsList[studentId] = result
    }
    state.newsList = {...state.newsList}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
