<template>
  <content-box @refresh="refresh"
               @loadmore="loadmore"
               :items="activityList"
               :error="error"
               ref="contentBox">
    <moments v-for="(item, index) in activityList"
             :images = "item.uploaded_photos.map(value => value.thumb)"
             :videos = "item.uploaded_photos.map(value => value.photo)"
             :avatar = "item.avatar"
             :name = "item.owner_name"
             :title =  "item.title"
             :timestamp = "item.timestamp"
             :key="index"
             class="weui-panel weui-panel_access td-card-panel__container">
    </moments>
  </content-box>
</template>

<script>
import { ViewBox } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import contentBox from '../../components/contentbox'
import moments from '../../components/Moments'

export default {
  name: 'activity-list',
  components: {
    ViewBox,
    contentBox,
    moments
  },
  data () {
    return {
      error: false
    }
  },
  methods: {
    ...mapActions('activity', [
      'getActivityList'
    ]),
    async getItems (loaded, reset) {
      try {
        this.error = false
        await this.getActivityList({reset})
        if (typeof loaded === 'function') loaded('done')
      } catch (e) {
        console.log(e)
        this.error = true
        if (typeof loaded === 'function') loaded('fail')
      }
    },
    refresh (loaded) {
      this.getItems(loaded, 'reset')
    },
    loadmore () {
      this.getItems()
    }
  },
  computed: {
    ...mapGetters('activity', [
      'activityList'
    ]),
    ...mapGetters('user', [
      'currentChild'
    ])
  },
  mounted () {
    console.log(this.activityList);
    if (this.activityList.length <= 0) {
      this.$refs.contentBox.pullDown(this.getItems)
    }
  }
}
</script>

<style scoped>

</style>
