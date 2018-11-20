<template>
  <view-box>
    <div class="td-time-plugin__container td-box-shadow" @click="TimeHandler">
      {{currentDate}}
    </div>
    <div class="td-attendance__card td-attendance__card-signIn">
      <div class="td-attendance__card-avatar" :style="{'backgroundImage': 'url(' + signIn.imageurl|| '' + ')'}">{{!signIn || signIn && !signIn.imageurl ? '暂无照片': ''}}</div>
      <p class="td-attendance__card-tag">签入: <span class="data">{{(signIn && signIn.pick_up ) || '--'}}</span></p>
      <p class="td-attendance__card-tag">时间:<span class="data">{{(signIn && signIn.recorded_on) || '--'}}</span></p>
      <p class="td-attendance__card-tag">体温:
        <span class="data">{{(signIn && signIn.temperature) || '--'}}</span>
      </p>
    </div>

    <div class="td-attendance__card td-attendance__card-signOut">
      <div class="td-attendance__card-avatar" :style="{'backgroundImage': 'url(' + signOut.imageurl||'' + ')'}">{{!signOut || signOut && !signOut.imageurl ? '暂无照片': ''}}</div>
      <p class="td-attendance__card-tag">签出: <span class="data">{{(signOut && signOut.pick_up) || '--' }}</span></p>
      <p class="td-attendance__card-tag">时间:<span class="data">{{(signOut && signOut.recorded_on) || '--'}}</span></p>
      <p class="td-attendance__card-tag">体温:<span class="data">{{(signOut && signOut.temperature) || '--'}}</span></p>
    </div>

    <children @change="getAttendance"></children>
  </view-box>
</template>

<script>
import attendanceService from '../../service/attendance'
import { Group, Datetime, ViewBox, Countup } from 'vux'
import Children from '../../components/childrenPlugin/children'
import { mapGetters } from 'vuex'

function getCurrentDate () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return year + '-' + month + '-' + day
}

export default {
  name: 'Attendance',
  components: {
    Group,
    Datetime,
    Children,
    ViewBox,
    Countup
  },
  data () {
    return {
      signIn: {},
      signOut: {},
      currentDate: getCurrentDate()
    }
  },
  created () {
    this.getAttendance()
  },

  methods: {
    /**
     * 获取考勤数据
     * @returns {Promise<void>}
     */
    async getAttendance () {
      try {
        this.$vux.loading.show()
        let res = await attendanceService.getAttendance(this.currentChild.id, this.currentDate)
        let attendance = (res && res.data && res.data.overviews[0] && res.data.overviews[0].records) || []
        this.signIn = attendance.find(value => value.attendance_type === 'Sign In') || {}
        this.signOut = attendance.find(value => value.attendance_type === 'Sign Out') || {}
      } catch (e) {
        console.log(e)
      }
      this.$vux.loading.hide()
    },

    /**
     * 点击切换时间
     * 点击确实时两次时间一致的话不做任何请求
     * @constructor
     */
    TimeHandler () {
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: this.currentDate,
        onConfirm: (val) => {
          if (val === this.currentDate) {
            this.$vux.datetime.hide()
            return false
          }
          this.currentDate = val
          this.getAttendance()
        }
      })
    }
  },

  computed: {
    ...mapGetters('user', [
      'currentChild'
    ])
  }
}
</script>

<style scoped>
.td-time-plugin__container{
  position: absolute;
  left: 10px;
  bottom: 60px;
  height: 40px;
  line-height: 40px;
  background: #E22065;
  color: #fff;
  width: 120px;
  border-radius: 50px;
  text-align: center;
}
.td-attendance__card{
  width: 90%;
  height: 155px;
  border-radius:10px;
  padding: 10px 15px;
  box-sizing: border-box;
  margin: 10px auto;
  box-shadow:  1px 1px 5px #aaaaaa;
  padding-left: 135px;
  position: relative;
}
.td-attendance__card-tag{
  height: 45px;
  line-height: 45px;
  color: #aaa;
  font-size: 14px;
}
.td-attendance__card-tag .data{
  display: block;
  float: right;
  height: 45px;
  font-size: 28px;
  font-weight: 500;
  color: #666;
}
.td-attendance__card-signIn{
  border-left: 9px solid #E22065;
}
.td-attendance__card-signOut{
  border-left: 9px solid #14AE69;
}
.td-attendance__card-avatar{
  position: absolute;
  left: 10px;
  top: 25px;
  width: 110px;
  height: 110px;
  background: #e3e3e3;
  background-repeat: no-repeat;
  background-size: cover;
  color: #aaa;
  text-align: center;
  line-height: 110px;
}
</style>
