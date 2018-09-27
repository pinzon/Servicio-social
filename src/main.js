// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/less/style.less'

import {onLoad, onLoad2} from './assets/js/inspinia'

Vue.mixin({
  mounted () {
    console.log('mounted mixin')
    onLoad()
    onLoad2()
  }
})

Vue.config.productionTip = false
require('../mock/mock')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
