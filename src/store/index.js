import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    products: {},
    categories: [],
    supermarkets: [],
    tags: [],
    numberOfPages: 0,
    selected: {
      category: '',
      supermarket: '',
      tag: '',
      search: '',
      page: 1
    },
    user: {
      username: '',
      id: 0
    }
  },
  actions: {
    FETCH_PRODUCTS (context, paginate) {
      console.log(context.getters.buildUrl('produkty', paginate))
      context.commit('SET_PRODUCTS', {})
      axios.get(context.getters.buildUrl('produkty', paginate))
        .then(response => {
          console.log(response)
          context.commit('SET_PRODUCTS', response.data.products)
          context.commit('SET_NUMBER_OF_PAGES', parseInt(response.data.number_of_pages))
        })
        .catch(error => {
          console.log(error)
        })
    }
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
    },
    SET_CURRENT_TAG (state, tag) {
      state.selected.tag = tag
    },
    SET_CURRENT_CATEGORY (state, category) {
      state.selected.category = category
    },
    SET_CURRENT_SUPERMARKET (state, supermarket) {
      state.selected.supermarket = supermarket
    },
    SET_CURRENT_SEARCH (state, search) {
      state.selected.search = search
    },
    SET_CURRENT_PAGE (state, page) {
      state.selected.page = page
    },
    SET_NUMBER_OF_PAGES (state, number) {
      state.numberOfPages = number
    }
  },
  getters: {
    buildUrl: (state, getters) => (path, paginate) => {
      return 'https://vegapo.sk/api/' + path + getters.getQuery(paginate)
    },
    getQuery: state => (paginate) => {
      let query = '?supermarket=' + state.selected.supermarket +
             '&kategoria=' + state.selected.category +
             '&tag=' + state.selected.tag +
             '&hladat=' + state.selected.search
      if (paginate) {
        query += '&p=' + state.selected.page
      }
      return query
    },
    getCategories: state => {
      let mcategories = []
      mcategories.push({label: 'Vsetky', value: ''})
      for (let category of state.categories) {
        mcategories.push({
          label: category.name,
          value: category.slug
        })
      }
      return mcategories
    },
    getSupermarkets: state => {
      let msupermarkets = []
      msupermarkets.push({label: 'Vsetky', value: ''})
      for (let supermarket of state.supermarkets) {
        msupermarkets.push({
          label: supermarket.name,
          value: supermarket.slug
        })
      }
      return msupermarkets
    },
    getTags: state => {
      let mtags = []
      mtags.push({label: 'Vsetky', value: ''})
      for (let tag of state.tags) {
        mtags.push({
          label: tag.name,
          value: tag.slug
        })
      }
      return mtags
    },
    getSearch: state => {
      return state.selected.search
    },
    getPage: state => {
      return state.selected.page
    }
  }
})
export default store
