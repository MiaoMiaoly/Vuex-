<template>
  <view-box>
    <group>
      <cell-box v-for="child in children" :key="child.id" :link="{name:'history', params: {id: child.id}}">
        <img :src="child.avatar_url" width="40" height="40">{{child.fullname}}
      </cell-box>
    </group>
  </view-box>
</template>

<script>
import { CellBox, ViewBox, Group } from 'vux'
import { mapGetters } from 'vuex'

export default {
  name: 'Message',
  components: {
    ViewBox,
    CellBox,
    Group
  },
  computed: {
    ...mapGetters('user', [
      'children'
    ])
  }
}
</script>

<style scoped>

</style>
