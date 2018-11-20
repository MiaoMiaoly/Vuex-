<template>
  <div>
    <previewer :list="list" ref="previewer" :options="options"></previewer>
  </div>
</template>

<script>
import { Previewer } from 'vux'

export default {
  name: 'previewPlugin',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    Previewer
  }
}
</script>

<style scoped>

</style>
