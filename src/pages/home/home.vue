<template>
  <div style="height: 100%">
    <div style="height: 70%;display: flex;">
      <router-link :to="{name:'attendance'}" class="td-box-shadow td-home-metro__attendance td-home-metro__center">
        <i class="iconfont_taobao icon-shouye td-home-metro__icon" style="font-size: 50px"></i>
        <p>接送</p>
      </router-link>

      <div class="td-home-metro__column">
        <router-link class="td-home-metro__news td-box-shadow td-home-metro__center" :to="{name: 'newsList'}">
          <i class="iconfont_taobao icon-xinxiaoxi td-home-metro__icon"></i>
          <p>最新消息</p>
        </router-link>

        <router-link class="td-box-shadow td-home-metro__weeklyUpdate td-home-metro__center" :to="{name: 'weeklyUpdates'}">
          <i class="iconfont_taobao icon-neironggengxin td-home-metro__icon"></i>
          <p>每周更新</p>
        </router-link>

      </div>
    </div>

    <router-link  class="td-box-shadow td-home-metro__survey td-home-metro__center" :to="{name: 'surveyList'}">
      <i class="iconfont_taobao icon-wenjuan td-home-metro__icon"></i>
      <p>问卷调查</p>
    </router-link>

    <children></children>

  </div>
</template>

<script>
import {Grid, GridItem} from 'vux'
import Children from '../../components/childrenPlugin'
import Qrcode from '../../components/qrcodePlugin/qrcodePlugin'

export default {
  components: {
    Grid,
    GridItem,
    Children,
    Qrcode
  },
  name: 'home'
}
</script>

<style scoped>
.td-home-metro__center {
  align-items:center;
  justify-content:center;
  color: #fff;
  flex-direction: column;
}
.td-home-metro__attendance {
  display: flex;
  width: 50%;
  background: #E65360;
  box-sizing: border-box;
  margin: 5px;
  border-radius: 5px
}
.td-home-metro__column {
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column
}
.td-home-metro__news {
  height: 50%;
  background: #FCC52D;
  margin: 5px 5px 5px 0;
  display: flex;
  border-radius: 5px
}
.td-home-metro__survey {
  display: flex;
  background: #FD9940;
  color:#fff;
  height: 30%;
  margin: 0 5px;
  align-items:center;
  border-radius: 5px
}
.td-home-metro__weeklyUpdate {
  height: 50%;
  background: #67983A;
  margin: 0 5px 5px 0;
  display: flex;
  border-radius: 5px
}
.td-home-metro__icon{
  font-size: 30px;
  display: block;
}
</style>
