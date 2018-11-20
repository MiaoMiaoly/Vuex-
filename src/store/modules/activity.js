import activityService from '../../service/activity'

const state = {
  activityList: {},
  pageSize: 10
}

const getters = {
  activityList: (state, getters) => {
    return state.activityList[getters.id] || []
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
  getActivityList ({commit, state, getters}, data) {
    console.log(data,'------');
    let { reset } = data
    let studentId = getters.id
    let activityList = getters.activityList
    // console.log(activityList,'---------');
    // console.log(activityList.slice(-1),'-------');
    // console.log(activityList.slice(-1)[0],'-------');
    let currentId = reset ? '' : (activityList.slice(-1)[0] && activityList.slice(-1)[0].batch_id)
    console.log(currentId,'currentId-------');
    return new Promise(async (resolve, reject) => {
      try {
        let res = await activityService.getActivityListV2(studentId, currentId, state.pageSize)
        console.log(res,'res---------------');
        if (res.data.status !== 0) {
          resolve()
          console.log(res.data,'res.data--------------');
          commit('GET_ACTIVITY_LIST_SUCCESS', {studentId, result: res && res.data && res.data.photos, reset})
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
  GET_ACTIVITY_LIST_SUCCESS (state, data) {
    console.log(data,'data-------------');
    let { studentId, result, reset } = data
     console.log(studentId,'studentId-------------');
     console.log(result,'result-------------');
     console.log(reset,'reset-------------');
     console.log(state.activityList[studentId],'state.activityList[studentId]----------');
    state.activityList[studentId] = state.activityList[studentId] || []
    if (!reset) {
      state.activityList[studentId] = state.activityList[studentId].concat(result)
    } else {
      state.activityList[studentId] = result
    }
    state.activityList = {...state.activityList}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
