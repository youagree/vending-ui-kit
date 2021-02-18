import { createLogger } from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins
})
