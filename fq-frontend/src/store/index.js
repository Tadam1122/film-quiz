import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: '/api',
    username: null,
    userId: null,
    isAdmin: false,
    isHost: false,
    pin: null,
  },
  mutations: {
    authenticate: function(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.username = auth.getUsername()
        state.userId = auth.getUserId()
        state.isAdmin = auth.isAdmin()
        state.isHost = auth.isHost()
        state.pin = auth.getPin()
      } else {
        state.username = null
        state.userId = null
        state.isAdmin = null
        state.isHost = null
        state.pin = null
      }
    },
  },
  actions: {
    authenticate: function(context) {
      context.commit('authenticate')
    },
  },
  modules: {},
})
