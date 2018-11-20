import previewComponent from './previewPlugin'
import { mergeOptions } from 'vux/src/libs/plugin_helper'

export function createVM (Vue) {
  const Preview = Vue.extend(previewComponent)
  const $vm = new Preview({
    el: document.createElement('div')
  })
  document.body.appendChild($vm.$el)
  return $vm
}

export function show ($vm, options) {
  if (typeof options === 'object') {
    mergeOptions($vm, options)
  }
  $vm.$nextTick(() => {
    $vm.$refs.previewer.show(options.index || 0)
  })
}

export default {
  show
}
