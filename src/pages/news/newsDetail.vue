<template>
    <div>
      <div v-html="news.content">

      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {isEmptyObject} from '../../util/validate'

export default {
  name: 'news-detail',
  computed: {
    ...mapGetters('news', [
      'newsList'
    ])
  },
  data () {
    return {
      news: {}
    }
  },
  mounted () {
    this.news = this.newsList.find(value => value.id === this.$route.params.id)
    if (isEmptyObject(this.news)) {
      this.$router.replace({name: 'newsList'})
    }
  }
}
</script>

<style scoped>

</style>
