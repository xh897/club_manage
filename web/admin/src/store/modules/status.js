const state = {
    loading: false
}
const mutations = {
    SET_LOADING: (state, loading) => {
        state.loading = loading
    }
}
const actions = {
    SET_LOADING: (state, loading) => {
        state.loading = loading
      }
}
export default {
    state,
    mutations,
    actions,
    namespaced: true
}
