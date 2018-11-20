<template>
    <content-box @refresh="refresh"
                 @loadmore="loadmore"
                 :items = "surveyList"
                 :error="error"
                 ref="contentBox">
      <moments v-for="(item, index) in surveyList"
               :avatar = "item.author_url"
               :name = "item.author_name"
               :timestamp = "item.timestamp"
               :key="index"
               state="问卷调查"
               :link="{name: 'survey', params: {id: item.id}}"
               class="weui-panel weui-panel_access td-card-panel__container">
        <template slot="title">
          <div>
            {{item.title}}<badge text="new" v-if="!item.is_filled" style="vertical-align: text-top"></badge>
          </div>
        </template>
      </moments>
    </content-box>
</template>

<script>
import contentBox from '../../components/contentbox'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Moments from '../../components/Moments/index'
import { Badge } from 'vux'

export default {
  name: 'survey-list',
  components: {
    contentBox,
    Moments,
    Badge
  },
  data () {
    return {
      error: false,
      noMore: false
    }
  },
  methods: {
    ...mapActions('survey', [
      'getSurveyList',
      'page'
    ]),
    ...mapMutations('survey', [
      'INIT_PAGE'
    ]),

    async getItems (loaded, reset) {
      try {
        this.error = false
        await this.getSurveyList({id: this.currentChild.id})
        if (typeof loaded === 'function') loaded('done')
      } catch (e) {
        console.log(e)
        this.error = true
        if (typeof loaded === 'function') loaded('fail')
      }
    },

    refresh (loaded) {
      this.INIT_PAGE()
      this.getItems(loaded, true)
    },

    loadmore (loaded) {
      this.getItems(loaded)
    }
  },
  mounted () {
    if (this.surveyList.length <= 0) {
      this.$refs.contentBox.pullDown(this.getItems)
    }
  },
  computed: {
    ...mapGetters('survey', [
      'surveyList'
    ]),
    ...mapGetters('user', [
      'currentChild'
    ])
  }
}
</script>

<style scoped>

</style>
