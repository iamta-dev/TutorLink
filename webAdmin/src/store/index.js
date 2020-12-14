import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './Auth_module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth: AuthModule
  }
})