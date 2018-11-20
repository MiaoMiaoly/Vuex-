<template>
    <content-box @refresh="refresh"
                 @loadmore="loadmore"
                 :items="newsList"
                 :error="error"
                 ref="contentBox">
      <moments v-for="(item, index) in newsList"
               :avatar = "item.published_by_url"
               :name = "item.published_by_name"
               :title =  "item.title"
               :content="item.content"
               :timestamp = "item.timestamp"
               :key="index"
               state="最新消息"
               @click.native="showContent(item.id)"
               class="weui-panel weui-panel_access td-card-panel__container">
      </moments>
    </content-box>
</template>

<script>
import contentBox from '../../components/contentbox/contentBox'
import moments from '../../components/Moments'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'News',
  components: {
    contentBox,
    moments
  },
  data () {
    return {
      error: false
    }
  },
  methods: {
    ...mapActions('news', [
      'getNewsList'
    ]),

    loadmore () {
      this.getItems()
    },

    showContent (id) {
      this.$router.push({name: 'news', params: {id}})
    },

    refresh (loaded) {
      this.getItems(loaded, true)
    },

    async getItems (loaded, reset) {
      try {
        this.error = false
        await this.getNewsList({reset})
        if (typeof loaded === 'function') loaded('done')
      } catch (e) {
        this.error = true
        if (typeof loaded === 'function') loaded('fail')
      }
    }
  },
  mounted () {
    if (this.newsList.length <= 0) {
      this.$refs.contentBox.pullDown(this.getItems)
    }
  },
  computed: {
    ...mapGetters('news', [
      'newsList'
    ]),
    ...mapGetters('user', [
      'currentChild'
    ])
  }
}
</script>

<style scoped>

</style>
