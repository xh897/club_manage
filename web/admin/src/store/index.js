import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import upload from './modules/upload'
import status from './modules/status'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    app,
    settings,
    user,
    upload,
    status,
  },
  getters: {
    ...getters
  }
})

export default store
