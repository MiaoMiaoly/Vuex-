<template>
  <content-box @refresh="refresh"
               @loadmore="loadmore"
               :items="updatesList"
               :error="error"
               ref="contentBox">
    <moments v-for="(item, index) in updatesList"
             :images = "item.image_urls"
             :avatar = "item.submit_by_url"
             :name = "item.submit_by_name"
             :title =  "item.title"
             :timestamp = "item.timestamp"
             :key="index"
             state="每周更新"
             class="weui-panel weui-panel_access td-card-panel__container">
    </moments>

  </content-box>
</template>

<script>
import { Spinner, ViewBox, TransferDom } from 'vux'
import Moments from '../../components/Moments/index'
import PullTo from 'vue-pull-to'
import contentBox from '../../components/contentbox'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'weekly-updates',
  components: {
    Moments,
    Spinner,
    PullTo,
    ViewBox,
    contentBox,
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      items: [],
      page: 1,
      size: 10,
      error: false,
      list: []
    }
  },
  filters: {
    Moments
  },

  methods: {
    ...mapActions('weeklyUpdates', [
      'getUpdatesList'
    ]),
    /**
     * 刷新列表
     * 异步完成后调用loaded方法
     * @param loaded
     * @returns {Promise<void>}
     */
    async refresh (loaded) {
      this.getItems(loaded, true)
    },

    async loadmore () {
      this.getItems()
    },

    async getItems (loaded, reset) {
      try {
        this.error = false
        await this.getUpdatesList({reset})
        if (typeof loaded === 'function') loaded('done')
      } catch (e) {
        console.log(e)
        this.error = true
        if (typeof loaded === 'function') loaded('fail')
      }
    }
  },

  mounted () {
    if (this.updatesList.length <= 0) {
      this.$refs.contentBox.pullDown(this.getItems)
    }
  },

  computed: {
    ...mapGetters('user', [
      'currentChild'
    ]),
    ...mapGetters('weeklyUpdates', [
      'updatesList'
    ])
  }
}
</script>

<style scoped>

</style>
