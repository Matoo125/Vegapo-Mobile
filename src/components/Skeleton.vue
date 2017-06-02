<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="0">
        Vegapo
      </q-toolbar-title>
    </div>  
      <!-- Left side Drawer -->
     <q-drawer swipe-only ref="leftDrawer">
      <div class="list platform-delimiter layout-padding">
          <p class="caption">Kategorie</p>
          <q-select
            class="auto"
            type="radio"
            v-model="choosenCategory"
            :options="categories"
          ></q-select>
        <br>
          <p class="caption">Obchody</p>
          <q-select
            class="auto"
            type="list"
            v-model="choosenSupermarket"
            :options="supermarkets"
          ></q-select>
        <br>
          <p class="caption">Tagy</p>
          <q-select
            class="auto"
            type="list"
            v-model="choosenTag"
            :options="tags"
          ></q-select>
        <br>
          <q-search v-model="choosenSearch" style="margin-top: 25px"></q-search>
        <br>
          <button class="primary" @click="FETCH_PRODUCTS()">
            Filter
          </button>

      </div>
    </q-drawer> 

    <router-view class="layout-view"></router-view>

    <!-- Footer
    <div slot="footer" class="toolbar"></div>
    -->
  </q-layout>
</template>

<script>
import axios from 'axios'
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      supermarkets: [],
      categories: [],
      tags: []
    }
  },
  methods: {
    ...mapActions([
      'FETCH_PRODUCTS'
    ]),
    ...mapMutations([
      'SET_CURRENT_SUPERMARKET'
    ])
  },
  computed: {
    choosenSupermarket: {
      get () {
        return this.$store.state.selected.supermarket
      },
      set (supermarket) {
        this.$store.commit('SET_CURRENT_SUPERMARKET', supermarket)
      }
    },
    choosenCategory: {
      get () {
        return this.$store.state.selected.category
      },
      set (category) {
        this.$store.commit('SET_CURRENT_CATEGORY', category)
      }
    },
    choosenTag: {
      get () {
        return this.$store.state.selected.tag
      },
      set (tag) {
        this.$store.commit('SET_CURRENT_TAG', tag)
      }
    },
    choosenSearch: {
      get () {
        return this.$store.state.selected.search
      },
      set (search) {
        this.$store.commit('SET_CURRENT_SEARCH', search)
      }
    }
  },
  mounted () {
    this.$store.dispatch('FETCH_PRODUCTS')
    var parent = this
    if (typeof this.$store.state.supermarkets === 'object' &&
        Object.keys(this.$store.state.supermarkets).length === 0) {
      axios.get('https://vegapo.sk/api/obchody')
        .then(function (response) {
          parent.$store.commit('SET_SUPERMARKETS', response.data.stores)
          parent.supermarkets = parent.$store.getters.getSupermarkets
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    if (typeof this.$store.state.categories === 'object' &&
        Object.keys(this.$store.state.categories).length === 0) {
      axios.get('https://vegapo.sk/api/kategorie')
        .then(function (response) {
          parent.$store.commit('SET_CATEGORIES', response.data.categories)
          parent.categories = parent.$store.getters.getCategories
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    if (typeof this.$store.state.tags === 'object' &&
        Object.keys(this.$store.state.tags).length === 0) {
      axios.get('https://vegapo.sk/api/tagy')
        .then(function (response) {
          parent.$store.commit('SET_TAGS', response.data.tags)
          parent.tags = parent.$store.getters.getTags
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
