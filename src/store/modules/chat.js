import chatService from '../../service/chat'

const state = {
  history: {}
}

const getters = {
  history: state => state.history
}

const actions = {
  getMessage ({commit, state}, data) {
    const { studentId } = data
    let currentid = state.history[studentId] && state.history[studentId].slice(-1)[0] && state.history[studentId].slice(-1)[0].id
    return new Promise(async (resolve, reject) => {
      try {
        let res = await chatService.getMessage(studentId, currentid)
        resolve()
        commit('GET_MESSAGE_LIST_SUCCESS', { studentId, message: res && res.data && res.data.results })
      } catch (e) {
        reject(e)
      }
    })
  },

  saveMessage ({commit}, data) {
    const { studentId, content } = data
    return new Promise(async (resolve, reject) => {
      try {
        let res = await chatService.sendMessage(studentId, content)
        resolve()
        commit('SEND_MESSAGE_SUCCESS', {studentId, content: res && res.data})
      } catch (e) {
        reject(e)
      }
    })
  }
}

const mutations = {
  GET_MESSAGE_LIST_SUCCESS (state, data) {
    let { studentId, message } = data
    if (state.history[studentId] instanceof Array) {
      state.history[studentId] = state.history[studentId].concat(message)
    } else {
      state.history[studentId] = message
    }
    state.history = {...state.history}
  },

  SEND_MESSAGE_SUCCESS (state, data) {
    let {studentId, content} = data
    state.history[studentId].unshift(content)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
