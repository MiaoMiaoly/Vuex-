<template>
  <view-box>
    <div class="td-contentBox__state" v-if="state !== 'done'">
      <div v-if="state === 'loading'"><spinner type="crescent"></spinner>&nbsp;&nbsp;&nbsp;&nbsp;{{ text }}</div>

      <p v-if="state === 'empty'">暂无数据~</p>

      <p v-if="state === 'error'">数据加载失败!<br><x-button mini type="primary" text="点击重试" @click.native="init"></x-button></p>
    </div>

    <group :title="assessment.klass" v-for="(assessment, index) in assessmentList" :key="index">
      <cell is-link :title="'主题名称:' + item.name "  v-for = "(item, index) in assessment.student_subjects" :key="index">
        <template slot="inline-desc">
          <div style="font-size: 12px">实施时间:{{item.date_from}} - {{item.date_to}}</div>
        </template>
      </cell>
    </group>
  </view-box>
</template>

<script>
import { Group, Cell, CellBox, ViewBox, Spinner, XButton } from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Assessment',
  components: {
    Group,
    Cell,
    CellBox,
    ViewBox,
    Spinner,
    XButton
  },
  data () {
    return {
      state: 'done'
    }
  },
  methods: {
    ...mapActions('assessment', [
      'getAssessmentList'
    ]),

    /**
     * 初始化数据
     * @returns {Promise<void>}
     */
    async init () {
      try {
        await this.getAssessmentList()
        if (this.assessmentList && this.assessmentList.length === 0) {
          this.state = 'empty'
        } else {
          this.state = 'done'
        }
      } catch (e) {
        this.state = 'error'
      }
    }
  },
  computed: {
    ...mapGetters('assessment', [
      'assessmentList'
    ])
  },
  async created () {
    this.init()
  }
}
</script>

<style scoped>

</style>
