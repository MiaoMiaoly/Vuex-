<template>
  <view-box ref="viewBox">
    <tabbar>
      <tabbar-item :selected="$route.name ==='home'" :link="{name: 'home'}">
        <i slot="icon" class="iconfont_taobao icon-home_light"></i>
        <i slot="icon-active" class="iconfont_taobao icon-home_fill_light"></i>
        <span slot="label">主页</span>
      </tabbar-item>

      <tabbar-item :selected="$route.name ==='message'" :link="{name: 'message'}">
        <i slot="icon" class="iconfont_taobao icon-mark"></i>
        <i slot="icon-active" class="iconfont_taobao icon-markfill"></i>
        <span slot="label">消息</span>
      </tabbar-item>

      <tabbar-item :selected="$route.name ==='activity'"  :link="{name: 'activity'}">
        <i slot="icon" class="iconfont_taobao icon-piclight"></i>
        <i slot="icon-active" class="iconfont_taobao icon-picfill"></i>
        <span slot="label">活动</span>
      </tabbar-item>

      <tabbar-item :selected="$route.name ==='person'" :link="{name: 'person'}">
        <i slot="icon" class="iconfont_taobao icon-my"></i>
        <i slot="icon-active" class="iconfont_taobao icon-myfill"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>

    <router-view></router-view>
  </view-box>

</template>

<script>
import { Tabbar, TabbarItem, ViewBox } from 'vux'

export default {
  name: 'tab',
  components: {
    Tabbar,
    TabbarItem,
    ViewBox
  }
}
</script>

<style scoped>

</style>
