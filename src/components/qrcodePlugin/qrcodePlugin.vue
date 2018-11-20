<template>
  <div>
    <popup position="top" height="30%" v-model="visible" style="overflow: inherit;background: #14AE69">
      <div class="td-bind-logo" style="margin-top: 30px"></div>
    </popup>

    <popup height="75%" v-model="visible" style="background: #fff;border-top-left-radius: 10px;border-top-right-radius: 10px;overflow: inherit;box-shadow: 1px 1px 5px #aaa">
      <div style="position: relative;height: 100%">
        <img :src="user.avatar" style="border-radius: 50%;position: absolute;top: -25px;border: 5px solid #fff;left: 50%;margin-left: -25px;box-shadow:1px 1px 5px #aaa" width="50" height="50">
        <i class="iconfont_taobao icon-guanbi1" @click="close" style="font-size: 20px;position: absolute;left: 8px;top:5px"></i>
        <div style="text-align: center;position: relative;top: 80px">
          <qrcode :value="qrcode" type="img"></qrcode>
          <p style="font-weight: 500;margin-top: 10px;font-size: 14px">二维码签到</p>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { Qrcode, Popup } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'qrcode-plugin',
  components: {
    Qrcode,
    Popup
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions('user', [
      'getQrcode'
    ]),
    close () {
      this.visible = false
    }
  },
  computed: {
    ...mapGetters('user', [
      'qrcode',
      'user'
    ]),
    visible: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  created () {
    if (!this.qrcode) {
      this.getQrcode()
    }
  }
}
</script>

<style scoped>
  .td-bind-logo{
    background-image: url('../../assets/logo.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 146px;
    height: 40px;
    margin: 0 auto;
  }
</style>
