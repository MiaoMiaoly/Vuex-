<template>
    <div>
      <div v-for="(item, index) in items" :key="index" class="td-chat-message__container" v-bind:class="{'td-chat-message__own': item.name === user.fullname}">
        <p class="td-chat-message__time" v-if="isRecent(item.create_time, items[index-1] && items[index-1].create_time)">{{item.create_time | formatDate }}</p>
        <div  class="clearfix td-chat-message__content-box">
          <img :src="item.avatar" class="td-chat-avatar">
          <div style="display: inline-block" class="td-chat-content">
            <p class="td-chat-message__name">{{item.name}}</p>
            <p class="td-chat-bubble" :class="[item.name === user.fullname? 'arrow-right': 'arrow-left']" v-html="getContent(item)" @click="preview($event, item)"></p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { formatDate } from '../../filter/formatDate'
import preview from '../../components/previewPlugin/index'
import { mapGetters } from 'vuex'

function trim (string) {
  return string.replace(/^\s+/, '').replace(/\s+$/, '')
}

export default {
  name: 'chat-item',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    isRecent (now, last) {
      let nowDate = new Date(now).getTime()
      let lastDate = last ? new Date(last).getTime() : 0
      return nowDate - lastDate > 60000 ? true : false
    },
    getContent (item) {
      let content = ''
      switch (item.content_type) {
        case 'file':
          var patt1 = new RegExp(".*(.jpg|.png|.gif)$")
          if (patt1.test(item.image_url)) {
            content = `<img src=${item.image_url} style="max-width: 150px;max-height: 150px">`
          } else {
            content = '[该版本暂时不支持此格式内容]'
          }
          break
        case 'text':
          content = trim(item.content).length > 0 ? item.content : '&nbsp'
          break
        default:
          content = '[该版本暂时不支持此格式内容]'
          break
      }
      return content
    },

    preview (event, item) {
      if (item.content_type !== 'text') {
        let imgs = []
        imgs.push({src: item.image_url})
        preview.show({
          options: {
            getThumbBoundsFn (index) {
              // find thumbnail element
              let thumbnail = event.target
              // get window scroll Y
              let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
              // optionally get horizontal scroll
              // get position of element relative to viewport
              let rect = thumbnail.getBoundingClientRect()
              // w = width
              return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
              // Good guide on how to get element coordinates:
              // http://javascript.info/tutorial/coordinates
            }
          },
          list: imgs,
          index: 0
        })
      }
    }
  },
  filters: {
    formatDate
  },
  computed: {
    ...mapGetters('user', [
      'user'
    ])
  }
}
</script>

<style scoped>
.td-chat-avatar{
  width: 35px;
  height: 35px;
  vertical-align: top;
  margin-right: 5px;
}
.td-chat-bubble {
  display: inline-block;
  padding: 3px 10px;
  max-width: 200px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e3e3e3;
  font-size: 14px;
}
.td-chat-message__container{
  margin: 15px 0;
  padding: 0 8px;
  font-family: 'SimHei';
  position: relative;
  text-align: center;
}
.td-chat-message__name{
  font-size: 8px;
  color:#666;
  line-height: 1.2;
}
.arrow-left,.arrow-right{
  position: relative;
}
.arrow-left:after {
  border: 4px solid transparent;
  border-right: 3px solid #fff;
  width: 0;
  height: 0;
  left: -7px;
  top: 10px;
  position: absolute;
  content: ' '
}
.td-chat-message__time{
  font-size: 10px;
  padding: 0px 6px;
  border-radius: 3px;
  margin: 0 auto;
  display: inline-block;
  background: #b3b3b3;
  color: #fff;
  margin-bottom: 5px;
}

.td-chat-message__own.td-chat-message__container .td-chat-avatar{
  float: right;
  margin-left: 10px;
  margin-right: 0;
}
.td-chat-message__own.td-chat-message__container .td-chat-content{
  float: right;
}
.td-chat-message__own.td-chat-message__container .arrow-right:after {
  border: 4px solid transparent;
  border-left: 3px solid #fff;
  width: 0;
  height: 0;
  right: -7px;
  top: 10px;
  position: absolute;
  content: ' '
}
.td-chat-message__content-box{
  text-align: left;
}
.td-chat-message__own.td-chat-message__container .td-chat-message__content-box{
  text-align: right;
}

</style>
