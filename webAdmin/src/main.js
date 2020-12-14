import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'

import VueChatScroll from 'vue-chat-scroll'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.config.productionTip = false
Vue.use(VueChatScroll)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
