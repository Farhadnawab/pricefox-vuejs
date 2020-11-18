import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: actions,
  getters: getters,
  mutations: mutations,
  state: state,
  plugins: [createPersistedState()]
})
