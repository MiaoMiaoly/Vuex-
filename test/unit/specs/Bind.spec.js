import Vue from 'vue'
import bind from '../../../src/pages/bind'

describe('bind.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(bind)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
