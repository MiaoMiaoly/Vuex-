<template>
    <view-box style="background: #e3e3e3" ref="viewBox">
      <pull-to @top-state-change="topStateChange"
               :top-load-method="loadmore">

        <template slot="top-block" slot-scope="props" >
          <div class="top-load-wrapper" v-if="!noMore">
            <svg class="icon"
                 :class="{
                  'icon-arrow': props.state === 'trigger',
                  'icon-loading': props.state === 'loading',
               }"
                 aria-hidden="true">
              <use :xlink:href="iconLink"></use>
            </svg>
            {{ props.stateText }}
          </div>
        </template>
        <div v-if="items && items.length <=0 && !loading" class="td-history__no-data">暂无聊天信息</div>

        <p class="td-chat-message__no-more" v-if="noMore" style="text-align: center">已无更多历史消息</p>

        <chat-item :items = "items"></chat-item>
      </pull-to>
      <div class="td-message-chat__container" style="position: absolute;bottom: 0;background: #fff;left:0;right: 0;height: 50px;line-height: 50px;padding: 0 80px 0 20px">
        <input type="text" style="height: 30px;border: 1px solid #e3e3e3;border-radius: 3px;width: 100%;outline: none;" v-model="content">
        <x-button mini type="primary" @click.native="send" style="position: absolute;right: 10px;top:10px" :disabled="content.length <= 0">发送</x-button>
      </div>
    </view-box>
</template>

<script>
import { ViewBox, XInput, XButton } from 'vux'
import { mapActions, mapGetters } from 'vuex'
import chatItem from './chatItem'
import PullTo from 'vue-pull-to'

function trim (string) {
  return string.replace(/^\s+/, '').replace(/\s+$/, '')
}

export default {
  name: 'History',
  components: {
    XButton,
    ViewBox,
    XInput,
    chatItem,
    PullTo
  },
  data () {
    return {
      content: '',
      iconLink: '',
      loading: false,
      noMore: false
    }
  },
  methods: {
    ...mapActions('chat', [
      'getMessage',
      'saveMessage'
    ]),
    topStateChange (state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-contentbox'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    },

    send () {
      if (trim(this.content).length <= 0) {
        this.content = ''
        return false
      }
      try {
        this.saveMessage({studentId: this.$route.params.id || this.currentChild.id, content: this.content})
      } catch (e) {
        console.log(e)
      }
      this.content = ''
    },

    async loadmore (loaded) {
      if (this.noMore) {
        loaded('done')
        return false
      }
      try {
        let length = this.items.length
        await this.getMessage({studentId: this.$route.params.id || this.currentChild.id})
        this.noMore = this.items.length === length
      } catch (e) {
        console.log(e)
      }
      loaded('done')
    }
  },
  async mounted () {
    let history = this.history[this.$route.params.id || this.currentChild.id] && this.history[this.$route.params.id || this.currentChild.id].length
    if (!history) {
      this.loading = true
      try {
        await this.getMessage({studentId: this.$route.params.id || this.currentChild.id})
      } catch (e) {
        console.log(e)
      }
      this.loading = false
      let height = this.$refs.viewBox.getScrollBody().offsetHeight
      setTimeout(() => {
        console.log(height)
        this.$refs.viewBox.scrollTo(height)
      }, 0)
    }
  },
  computed: {
    ...mapGetters('user', [
      'currentChild'
    ]),
    ...mapGetters('chat', [
      'history'
    ]),
    items () {
      return this.history
        && this.history[this.$route.params.id || this.currentChild.id]
        && JSON.parse(JSON.stringify(this.history[this.$route.params.id || this.currentChild.id])).reverse()
    }
  }
}
</script>

<style scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden
  }
  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }
  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes loading
  {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
  .top-load-wrapper {
    line-height: 50px;
    text-align: center;
  }
  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }
  .td-contentBox__state {
    height: 100%;
    margin-top: 50%;
    text-align: center;
  }
  .td-chat-message__no-more{
    font-size: 12px;
    color: #666;
  }
  .td-history__no-data{
    text-align: center;
    margin-top: 30px;
  }
</style>
