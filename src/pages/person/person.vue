<template>
    <div>
      <blur :blur-amount=40 :url="user.avatar">
        <p class="center">
          <img :src="user.avatar">
        </p>

        <p style="text-align: center">
          {{user.fullname}}
        </p>

        <div style="position: absolute;top: 0; right: 10px">
          <i class="iconfont_taobao icon-qr-code" style="font-size: 30px" @click="visible = true"></i>
        </div>

      </blur>

      <group>
        <cell title="姓名" :is-loading="isEmptyObject(profile)" :value="profile.name"></cell>
        <cell title="电话" :is-loading="isEmptyObject(profile)" :value="profile.contact_no"></cell>
        <cell title="邮箱" :is-loading="isEmptyObject(profile)" :value="profile.email"></cell>
        <cell title="地址" :is-loading="isEmptyObject(profile)" :value="profile.address"></cell>
      </group>

      <!-- <router-link @click.native="logout" class="logout" :to="{name: 'bind'}"> -->
        <div class="logout">
           <p  @click="logout" >登出</p>
        </div>
       
      <!-- </router-link> -->

      <qrcode v-model="visible"></qrcode>

    </div>
</template>

<script>
import { Blur, Group, Cell } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { isEmptyObject } from '../../util/validate'
import qrcode from '../../components/qrcodePlugin/qrcodePlugin'

export default {
  name: 'Person',
  components: {
    Blur,
    Group,
    Cell,
    qrcode
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'user',
      'profile'
    ])
  },
  methods: {
    ...mapActions('user', [
      'getProfile',
      'clear'
    ]),
    isEmptyObject: isEmptyObject,
    logout () {
      this.clear();
      this.$router.push({path:'/bind',name: 'bind'});

    }
  },
  created () {
    console.log("进去了我的页面")
    if (isEmptyObject(this.profile)) {
      this.getProfile(this.user.guardian.id)
    }
  }
}
</script>

<style scoped>
 .center {
   text-align: center;
   padding-top: 20px;
   color: #fff;
   font-size: 18px;
 }

 .center img{
   width: 100px;
   height: 100px;
   border-radius: 50%;
   border: 4px solid #ececec
 }

 .logout>p{
    width: 200px;
    height: 40px;
    color: #fff;
    background-color: #4BC57C;
    border-radius: 20px;
    margin: auto;
    text-align: center;
    line-height: 40px;
    margin-top: 50px;
 }
</style>