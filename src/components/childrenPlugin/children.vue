<template>
  <div>
    <div class="td-children-plugin__wrap" @click="show = true">
      <img :src="currentChild.avatar_url" class="td-children-plugin__avatar">
      <span style="color:#fff">{{currentChild.fullname}}</span>
    </div>

    <div v-transfer-dom>
      <popup v-model="show" height="130px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:110px;margin:0 auto;border-radius:5px;padding-top:10px;">
          <scroller lock-y>
            <div class="td-children-plugin__item-box" :style="style">
              <div v-for="child in children" :key="child.id" class="td-children-plugin__item" @click="childSelectHandler(child)">
                <div class="td-children-plugin__item-avatar" :style="{'backgroundImage': 'url(' + child.avatar_url + ')'}"></div>
                <p class="text-center">{{child.fullname}}</p>
              </div>
            </div>
          </scroller>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Popup, TransferDom, Group, Cell, XButton, Scroller } from 'vux'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Popup,
    Group,
    Cell,
    XButton,
    Scroller
  },
  name: 'children',
  directives: {
    TransferDom
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    ...mapMutations('user', {
      changeCurrentChild: 'CHANGE_CURRENT_CHILD'
    }),
    childSelectHandler (child) {
      if (child.id === this.currentChild.id) return false
      this.changeCurrentChild(child)
      this.$emit('change', child)
      this.show = false
    }
  },
  computed: {
    ...mapGetters('user', [
      'children',
      'currentChild'
    ]),
    style () {
      return {
        width: this.children.length * 90 + 'px'
      }
    }
  }
}
</script>

<style scoped>
.td-children-plugin__wrap{
  font-family: 'STHeiti';
  position: absolute;
  bottom: 60px;
  right: 10px;
  width: 120px;
  border-radius: 50px;
  background: #14AE69;
  border: 1px solid #43A76D;
  text-align: center;
  height: 40px;
  line-height: 40px;
  box-shadow: 1px 1px 5px #aaa;
}
.td-children-plugin__avatar{
  height: 22px;
  width: 22px;
  vertical-align: middle;
}
.td-children-plugin__item {
  display: inline-block;
  margin-right: 10px;
}
.td-children-plugin__item:last-child{
  margin-right: 0;
}
.td-children-plugin__item-avatar{
  background-repeat: no-repeat;
  background-size: cover;
  width: 80px;
  height: 80px;
  border-radius: 5px;
}
.td-children-plugin__item-box{
  padding: 0 10px;
}
</style>
