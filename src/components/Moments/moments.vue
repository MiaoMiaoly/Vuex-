<template>
  <div class="weui-panel weui-panel_access td-card-panel__container">
    <img :src="avatar" class="td-card-panel__avatar" v-if="avatar">
    <img src="../../assets/default.jpeg" class="td-card-panel__avatar" v-else>

    <div @click="go">
      <div class="weui-panel__hd">
        <p class="td-card-panel__status">{{name|| 'principal'}}</p>
      </div>
      <div class="weui-media-box__desc td-card-box__desc">
        <slot name="title">{{ title }}</slot>
      </div>

      <div v-if = "images && images.length === 1" >
        <img v-if = "mp4s && mp4s.length < 1" :src="images[0]" class="td-card-panel__image-single td-image-preview" @click="imageHandler($event, 0)">
        <video v-if = "mp4s && mp4s.length === 1" style="width:90%;background-color: #000" isrotate="true" controls x5-playsinline playsinline webkit-playsinline preload="auto" :src="mp4s[0]" :poster="images[0]"></video>
      </div>
      <ul class="clearfix" v-else>
        <li v-for="(src, index) in images"
            :key="index"
            :style="{'backgroundImage': 'url(' + src + ')'}"
            class="td-card-panel__grid td-card-panel__default td-image-preview"
            v-if="index<=8"
            @click="imageHandler($event, index)">
        </li>
      </ul>
      <div class="td-card-panel__footer">
        <p><span v-if="state">{{state}} |</span> {{ timestamp | Moments}} </p>
      </div>
    </div>

  </div>
</template>

<script>
import { Moments } from '../../filter/moments'
import preview from '../../components/previewPlugin/index'
// import { Previewer, TransferDom } from 'vux'

export default {
  name: 'Moments',
  data () {
    return {
       mp4s: [],
    }
  },
  props: {
    images: Array,
    videos: Array,
    avatar: String,
    name: String,
    title: String,
    timestamp: Number,
    state: String,
    link: [String, Object]
  },
  filters: {
    Moments
  },
  mounted: function () {
    this.showVideo();
  },
  methods: {
    showVideo () {
      // console.log(this.videos);
      this.videos.map(value => {
        // console.log(value)
        var index1=value.lastIndexOf(".");
        var index2=value.length;
        var postf=value.substring(index1,index2);//后缀名
        if (postf == ".mp4") {
          this.mp4s.push(value);
        }
      })
      console.log(this.mp4s)
    },
    /**
     * 点击图片事件
     */
    imageHandler (event, index) {
      preview.show({
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = event.target.parentNode.querySelectorAll('.td-image-preview')[index]
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
        list: this.list,
        index: index
      })
    },

    go () {
      this.link && this.$router.push(this.link)
    }
  },
  computed: {
    list () {
      return this.images.map(value => {
        return {src: value}
      })
    }
  }
}
</script>

<style scoped>
  .td-card-panel__container{
    padding-left: 60px;
    position: relative;
    margin-top: 0;
    padding-right: 10px;
  }
  .td-card-panel__container .weui-panel__hd{
    padding: 6px 0 4px 0;
  }
  .td-card-panel__container .weui-panel__hd:after{
    height: 0;
    border-bottom: none;
  }
  .td-card-panel__avatar {
    width: 36px;
    height: 36px;
    border-radius: 2px;
    position: absolute;
    left: 10px;
    top: 6px;
  }
  .td-panel-cover{
    height: 80px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .td-card-panel__status{
    color:#666;
    font-size: 13px;
    font-weight: bold;
  }
  .td-card-panel__time{
    font-size: 12px;
  }
  .td-card-panel__footer{
    color: #777;
    padding: 5px 0 8px 0;
    font-size: 12px;
  }
  .td-card-box__desc{
    color: #666;
    margin: 3px 0 6px 0;
  }
  .td-card-panel__image{
    max-width: 100%;
    max-height: 100%;
  }
  .td-card-panel__image-single{
    max-width: 100%;
    max-height: 120px
  }
  .td-card-panel__grid{
    float:left;
    background: no-repeat center center;
    margin-right:3px;
    margin-bottom: 3px;
    height: 80px;
    width: 30%;
    list-style-type: none;
  }
  .td-card-panel__default{
    background-image: url("../../assets/imgdf.png");
    background-size: cover;
    background-color: #eee;
  }
</style>
