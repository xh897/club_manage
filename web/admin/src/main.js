import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18ns
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import moment from 'moment'
// import vueIM from 'vue-im'
// Vue.use(vueIM)
import http from '@/utils/request'
Vue.prototype.$http = http

Vue.prototype.$moment = moment

Vue.use(ElementUI)

Vue.config.productionTip = false

// 将Vue 合并选项 函数挂载到Vue原型上
Vue.prototype.mergeOptions = Vue.util.mergeOptions

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
