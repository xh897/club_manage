import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    organizationManager: [],
  },
  getters: {
  },
  mutations: {
    SET_TOKEN(state, data) {
      localStorage.setItem('communityToken', data.token)
      state.userInfo = data
      state.organizationManager = data.organizationManager;
    },
    LOG_OUT(state) {
      localStorage.removeItem('communityToken')
      state.userInfo = {}
    }
  },
  actions: {
    setUser({ commit }, data) {
      commit('SET_TOKEN', data)
    },
    logout({ commit }) {
      commit('LOG_OUT')
    }
  },
  modules: {
  }
})
