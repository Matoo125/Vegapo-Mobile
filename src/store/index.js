import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    products: {},
    categories: {},
    supermarkets: {},
    tags: {}
  },
  actions: {
  /*  setProducts: function ({ commit }, products) {
      commit('SET_PRODUCTS', products)
    },
    setCategories: function ({ commit }, categories) {
      commit('SET_CATEGORIES', categories)
    },
    setSupermarkets: function ({ commit }, supermarkets) {
      commit('SET_SUPERMARKETS', supermarkets)
    },
    setTags: function ({ commit }, tags) {
      commit('SET_TAGS', tags)
    } */
  },
  mutations: {
    SET_PRODUCTS (state, products) {
      state.products = products
    },
    SET_CATEGORIES (state, categories) {
      state.categories = categories
    },
    SET_SUPERMARKETS (state, supermarkets) {
      state.supermarkets = supermarkets
    },
    SET_TAGS (state, tags) {
      state.tags = tags
    }
  },
  getters: {
  /*  getProducts: function ({ commit }) {
      return state.products
    },
    getCategories: function ({ commit }) {
      return state.categories
    },
    getSupermarkets: function ({ commit }) {
      return state.supermarkets
    },
    getTags: function ({ commit }) {
      return state.tags
    } */
  }
})
export default store
