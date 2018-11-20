<template>
    <div class="td-bind__container">
      <div>
          <div class="td-bind-logo__container">
            <div class="td-bind-logo"></div>
          </div>

          <div class="weui-cell td-bind-login">
            <div class="weui-cell__hd" >
              <label class="weui-label" style="width: 60px">用户名</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请填写泰迪用户名" v-model="form.username">
            </div>
          </div>

          <div class="weui-cell td-bind-login">
            <div class="weui-cell__hd">
              <label class="weui-label" style="width: 60px">密码</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="password" placeholder="请填写泰迪密码" v-model="form.password">
            </div>
          </div>

        </div>

        <div style="padding-top: 30px">
          <x-button type="primary"
                    @click.native="bindHandler"
                    :show-clear="false"
                    :disabled="disabled">绑定</x-button>
        </div>
    </div>
</template>

<script>
import {
  XInput,
  XButton,
  Group
} from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'bind',

  components: {
    XInput,
    XButton,
    Group
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions('user', [
      'bindWechat'
    ]),

    async bindHandler () {
      if (!(this.openId || localStorage.getItem("WechatOpenid"))) {
        this.$vux.alert.show({content: '微信账号过期,请刷新页面'})
        return false
      }else{
        this.$vux.loading.show({text: '登录中'})
        let openid = this.openId || localStorage.getItem("WechatOpenid");
        try {
          await this.bindWechat({username: this.form.username, password: this.form.password, openId: openid})
          this.$router.replace({name: 'home'})
        } catch (e) {
          this.$vux.alert.show({content: '用户名或者密码错误'})
        }
        this.$vux.loading.hide()
      }
    }
  },

  computed: {
    ...mapGetters('user', [
      'openId'
    ]),
    disabled () {
      return !(this.form.username && this.form.password)
    }
  }
}
</script>

<style scoped>
  .td-bind__container {
    margin-top: 80px;
    padding: 0 8px;
  }

  .td-bind-logo__container{
    margin-bottom: 40px;
  }

  .td-bind-logo{
    background-image: url('../../assets/logo.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 146px;
    height: 40px;
    margin: 0 auto;
  }

  .td-bind-login{
    font-size: 14px;
    padding: 10px 5px;
  }
  .td-bind-login.weui-cell:before{
    top: 100%;
    left: 0
  }

</style>
