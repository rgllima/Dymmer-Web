import Vuex from 'vuex'
import Vue from 'vue'

import authentication from './modules/authentication'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    authentication
  },
  strict: debug
})
