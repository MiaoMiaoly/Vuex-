import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import survey from './modules/survey'
import assessment from './modules/assessment'
import activity from './modules/activity'
import news from './modules/news'
import chat from './modules/chat'
import weeklyUpdates from './modules/weeklyUpdates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    assessment,
    survey,
    activity,
    news,
    chat,
    weeklyUpdates
  }
})
