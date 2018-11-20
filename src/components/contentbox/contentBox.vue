<template>
  <view-box body-padding-bottom="0">
    <pull-to @top-state-change="topStateChange"
             :top-load-method="refresh"
             @infinite-scroll="loadmore"
             ref="pull">
      <template slot="top-block" slot-scope="props">
        <div class="top-load-wrapper">
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

        <div v-if="items.length === 0 && $refs.pull && $refs.pull.state !== 'loading' && !error" class="td-contentBox__state">暂无数据</div>

        <div v-if="items.length ===0 && $refs.pull && $refs.pull.state !== 'loading' && error" class="td-contentBox__state">获取列表失败,下拉重新获取!</div>

      </template>

     <slot></slot>

      <div class="td-contentBox__load-more" v-if="items.length > 0 && !noMore && !error">
        <svg class="icon icon-loading"
             aria-hidden="true">
          <use xlink:href="#icon-contentbox"></use>
        </svg>
        加载中...
      </div>

      <divider v-if="items.length > 0 && noMore">我是有底线的</divider>
    </pull-to>
  </view-box>
</template>

<script>
import { Spinner, XButton, ViewBox, Divider } from 'vux'
import PullTo from 'vue-pull-to'

export default {
  name: 'Loading',
  props: {
    error: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    error (value) {
      if (value && this.items.length > 0) {
        this.$vux.toast.show('获取列表失败')
      }
    },
    items (value, oldValue) {
      if ((value.length === oldValue.length && value.length !== 0 && !this.reset) || value.length % 10 !== 0) {
        this.noMore = true
      }
    }
  },
  data () {
    return {
      iconLink: '',
      noMore: false,
      reset: true
    }
  },
  components: {
    Spinner,
    XButton,
    ViewBox,
    PullTo,
    Divider
  },
  methods: {
    refresh (loaded) {
      this.reset = true
      this.noMore = false
      this.$emit('refresh', loaded)
    },
    topStateChange (state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-contentbox'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    },
    loadmore () {
      if (this.error || this.noMore) return
      this.reset = false
      this.$emit('loadmore')
    },
    pullDown (callback) {
      this.$refs.pull.scrollTo(50)
      this.iconLink = '#icon-contentbox'
      this.$refs.pull.state = 'loading'
      this.$refs.pull.topText = '加载中'
      if (typeof callback === 'function') {
        callback(this.$refs.pull.actionLoaded)
      }
    }
  },
  mounted () {
    if (this.items.length % 10 !== 0) this.noMore = true
  }
}
</script>

<style scoped>
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
.td-contentBox__load-more{
  height: 40px;
  line-height: 40px;
  text-align: center;
}

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
</style>
