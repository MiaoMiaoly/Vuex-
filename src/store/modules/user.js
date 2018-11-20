import commonService from '../../service/common'
import {isEmptyObject} from '../../util/validate'

const state = {
  user: {},
  children: [],
  currentChild: {},
  profile: {},
  qrcode: '',
  openId: ''
}

const getters = {
  user: state => isEmptyObject(state.user) ? JSON.parse(localStorage.getItem('user')) : state.user,
  children: state => isEmptyObject(state.children) ? JSON.parse(localStorage.getItem('user')).children : state.children,
  currentChild: state => isEmptyObject(state.currentChild) ? JSON.parse(localStorage.getItem('currentChild')) : state.currentChild,
  profile: state => state.profile,
  qrcode: state => state.qrcode,
  openId: state => state.openId
}

const actions = {
  /**
   * 绑定泰迪账户&微信
   * @param commit
   * @param data
   * @returns {Promise<any>}
   */
  bindWechat ({ commit }, data) {
    const { username, password, openId } = data
    return new Promise(async (resolve, reject) => {
      try {
        let res = await commonService.bind(username, password, openId)
        resolve()
        commit('LOGIN_SUCCESS', res && res.data)
      } catch (e) {
        reject(e)
      }
    })
  },

  getOpenid ({ commit }, data) {
    const { code } = data
    return new Promise(async (resolve, reject) => {
      try {
        let res = await commonService.openid(code)
        console.log(res);
        resolve()
        commit('LOGIN_FAILED', res && res.data.openid)

        localStorage.setItem("WechatOpenid",res.data.openid)
        
        let response = await commonService.login(res.data.openid)
        resolve()
        commit('LOGIN_SUCCESS', response && response.data)

      } catch (res) {
        reject(res)
      }
    })
  },

  // loginWechat ({ commit }, data) {
  //   const { openid } = data
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let res = await commonService.login(openid)
  //       resolve()
  //       commit('LOGIN_SUCCESS', res && res.data)
  //     } catch (res) {
  //       reject(res)
  //     }
  //   })
  // },
  

  getProfile ({commit}, data) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await commonService.getProfile(data)
        resolve()
        commit('FETCH_PROFILE_SUCCESS', res && res.data)
        console.log("**************************");
        console.log(res.data);
        console.log("**************************");
      } catch (e) {
        reject(e)
      }
    })
  },

  getQrcode ({commit}) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await commonService.getQrcode()
        resolve()
        commit('FETCH_QRCODE_SUCCESS', res && res.data.qrcode)
      } catch (e) {
        reject(e)
      }
    })
  },
  clear({commit}){
    commit('clearData')
  }
}

const mutations = {
  LOGIN_SUCCESS (state, data) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('currentChild', JSON.stringify(data.user.children[0]))
    state.user = data.user
    state.currentChild = data.user.children[0]
  },
  LOGIN_FAILED (state, data) {
    console.log(state)
    console.log("在这里获取opneid")
    console.log('openId', data)
    state.openId = data
  },
  CHANGE_CURRENT_CHILD (state, child) {
    localStorage.setItem('currentChild', JSON.stringify(child))
    state.currentChild = child
  },
  FETCH_PROFILE_SUCCESS (state, profile) {
    state.profile = profile
  },
  FETCH_QRCODE_SUCCESS (state, QRCODE) {
    state.qrcode = QRCODE
  },
  clearData(state){
    state.user={};
    state.children=[];
    state.currentChild={};
    state.profile= {};
    state.qrcode= '';
    state.openId='';
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
