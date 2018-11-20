<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import { Popup } from 'vux'
import { mapActions } from 'vuex'

function GetQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg) // 获取url中"?"符后的字符串并正则匹配
  let context = ''
  if (r != null) context = r[2]
  reg = null
  r = null
  return context == null || context === '' || context === 'undefined' ? '' : context
}

export default {
  name: 'App',
  components: {
    Popup
  },
  methods: {
    ...mapActions('user', [
      'getOpenid'
    ])
  },
  async created () {
    try {
      this.$vux.loading.show('获取用户信息中')
      console.log("***************");
      console.log(GetQueryString('code'));
      await this.getOpenid({code: GetQueryString('code')})
      if (this.$route.name === 'bind') this.$router.replace({name: 'home'})
    } catch (e) {
      if (this.$route.name !== 'bind') this.$router.replace({name: 'bind'})
    }
    this.$vux.loading.hide()
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

</style>
