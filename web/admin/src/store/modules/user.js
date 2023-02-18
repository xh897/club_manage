import { getToken, getName, getName1, setToken, setName, setName1, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import request from '@/utils/request'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getName(),
    organizationManager: getName1(),
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_NAME1: (state, organizationManager) => {
    state.organizationManager = organizationManager
  },

}
//采用vuex在本地缓存cookie
const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      request
        .login({ username: username.trim(), password: password })
        .then(response => {
          const data = response
          console.log(data);
          commit('SET_NAME', username)
          commit('SET_NAME1', data.organizationManager)
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          setName(username)
          setName1(data.organizationManager)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getInfo({ commit }, name) {
    commit('SET_NAME', name)
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}