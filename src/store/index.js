import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    products: {}
  },
  actions: {
    LOAD_PRODUCTS: function ({ commit }) {}
  },
  mutations: {

  },
  getters: {

  }
})
export default store
