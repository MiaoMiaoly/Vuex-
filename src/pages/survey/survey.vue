<template>
    <view-box style="background: #f3f3f3;" body-padding-bottom="0">

      <p style="text-align:center;margin-top: 30px" v-if="loading">
        <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;加载中...</span>
      </p>

      <div v-if="error" style="text-align: center" class="td-survey__error-message">
        <p>获取列表失败!</p>
        <x-button type="primary" mini @click.native="refresh">点击重试</x-button>
      </div>

      <div class="td-survey__title">{{survey.title}}</div>

      <div v-html="transform(survey.description)" class="td-survey__description"></div>

      <div v-for="(item,index) in items" :key="index" class="td-survey__container">
        <group  v-if="item.type === 0">
          <template slot="title">
            <div class="weui-cells__title">
              {{index + 1}}. <span :class="{'import': item.is_required}">{{item.is_required ? '(必填)': '(选填)'}}</span>
              {{item.title}}
            </div>
          </template>
          <radio :options="getOptions(item.options)" v-model="item.answer" :disabled="filled">
          </radio>
        </group>

        <checklist v-else
                   label-position="left"
                   :disabled="filled"
                   :required="item.is_required"
                   v-model="item.answer"
                   :options="getOptions(item.options)">
          <template slot="after-title">
            <div class="weui-cells__title">
              {{index + 1}}.<span :class="{'import': item.is_required}">{{item.is_required ? '(必填)': '(选填)'}}</span>
              {{item.title}}
            </div>
          </template>

        </checklist>
      </div>

      <group v-if="items && items[0] && !items[0].is_realname && items.length > 0 && !loading && !filled">
        <x-switch title="是否匿名提交" v-model="anonymous"></x-switch>
      </group>

      <div v-transfer-dom>
        <popup v-model="show" height="100%" style="background: #fff">
          <msg title="操作成功" description="非常感觉您的回答!" :buttons="buttons" icon="success"></msg>
        </popup>
      </div>

      <x-button type="primary" v-if="items.length > 0 && !loading &&!filled " @click.native="submit" style="margin: 20px 0 10px">提交</x-button>
    </view-box>
</template>

<script>
import surveyService from '../../service/survey'
import { mapGetters } from 'vuex'
import { Checklist, Group, Radio, ViewBox, InlineLoading, XButton, XSwitch, Msg, Popup, TransferDom } from 'vux'
import {isEmptyObject} from '../../util/validate'

export default {
  name: 'Survey',
  data () {
    return {
      survey: {},
      items: [],
      loading: false,
      error: '',
      filled: false,
      anonymous: false,
      show: false,
      buttons: [{
        type: 'primary',
        text: '返回问卷列表',
        onClick: this.goBack.bind(this)
      }]
    }
  },
  components: {
    Group,
    Checklist,
    Radio,
    ViewBox,
    XButton,
    InlineLoading,
    XSwitch,
    Msg,
    Popup
  },
  directives: {
    TransferDom
  },
  async created () {
    this.survey = this.surveyList.find(value => value.id === this.$route.params.id)
    if (!isEmptyObject(this.survey)) {
      this.getItems()
    } else {
      this.$router.replace({name: 'surveyList'})
    }
  },
  computed: {
    ...mapGetters('user', [
      'currentChild'
    ]),
    ...mapGetters('survey', [
      'surveyList'
    ])
  },
  methods: {
    getOptions (options) {
      return options.map(value => {
        return {key: value.id, value: value.name}
      })
    },
    goBack () {
      this.$router.go(-1)
    },

    refresh () {
      this.getItems()
    },

    transform (string) {
      string = string.replace(/\r\n/g,'<br>')
      string = string.replace(/\n/g, '<br>')
      string = string.replace(/\s/g, '&nbsp;')
      return string
    },

    async getItems () {
      try {
        this.loading = true
        this.error = ''
        let res = await surveyService.getSurvey(this.currentChild.id, this.$route.params.id)
        this.items = res.data
        this.items.map(item => {
          item.type === 0 ? item.answer = '' : item.answer = []
          item.options.map(value => {
            if (value.answer === true) {
              this.filled = true
              item.type === 0 ? item.answer = value.id : item.answer.push(value.id)
            }
          })
        })
        this.loading = false
      } catch (e) {
        this.loading = false
        this.error = e
      }
    },

    async submit () {
      let items = JSON.parse(JSON.stringify(this.items))
      for (let key in items) {
        items[key].answer = items[key].answer instanceof Array
          ? items[key].answer.join(',')
          : items[key].answer
      }
      if (!this.validate(items)) {
        this.$vux.toast.show({text: '请完成必填项!', type: 'text'})
        return
      }
      let form = {
        survey: this.$route.params.id,
        is_anonymous: this.anonymous,
        questions: items
      }
      try {
        this.$vux.loading.show('数据提交中')
        let res = await surveyService.saveSurvey(this.currentChild.id, form)
        if (res && res.data && res.data.status === 0) {
          this.errorHandler()
        } else {
          this.show = true
        }
      } catch (e) {
        this.errorHandler()
      }
      this.$vux.loading.hide()
    },

    errorHandler () {
      this.$vux.toast.show('数据提交失败', 'top')
    },

    validate (items) {
      for (let key in items) {
        if (items[key].is_required && !items[key].answer) return false
      }
      return true
    }
  }
}
</script>

<style scoped>
.td-survey__container{
  margin-bottom: 20px;
}
.td-survey__error-message{
  text-align: center;
  margin-top: 30px;
  line-height: 30px;
}
.import{
  color: #F94844
}
.td-survey__description{
  padding: 10px;
}
.td-survey__title{
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
}
</style>
