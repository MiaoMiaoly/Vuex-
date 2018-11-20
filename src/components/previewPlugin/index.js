import Vue from 'vue'
import { createVM, show } from './module'

let $vm

if (!$vm) {
  $vm = createVM(Vue)
}

const manager = {}

export default {
  show (options) {
    return show.call(manager, $vm, options)
  }
}
