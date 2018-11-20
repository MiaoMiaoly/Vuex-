// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { LoadingPlugin, AlertPlugin, DatetimePlugin, ToastPlugin } from 'vux'
import './common.css'
import 'vux/src/styles/weui/weui.less'
import './assets/iconfont.css'
import './assets/icon.css'
import './assets/fonts/iconfont.js'
import store from './store/store'
const FastClick = require('fastclick')

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
