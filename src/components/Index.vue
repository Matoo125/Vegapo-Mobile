<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="0">
        Vegapo
      </q-toolbar-title>
    </div>
      <!-- Left side Drawer -->
    <q-drawer ref="leftDrawer">
      <div class="list platform-delimiter">
        <div class="list-header">
          Filtre
        </div>
        <div class="row">
          <q-select
            class="auto"
            type="list"
            v-model="selectedCategory"
            :options="selectCategory"
          ></q-select>
        </div>
        <br>
        <div class="row">
          <q-select
            class="auto"
            type="list"
            v-model="selectedSupermarket"
            :options="selectSupermarket"
          ></q-select>
        </div>
        <br>
        <div class="row">
          <q-select
            class="auto"
            type="list"
            v-model="selectedTag"
            :options="selectTag"
          ></q-select>
        </div>
        <br>
        <div class="row">
          <q-search v-model="currentSearch"></q-search>
        </div>
        <br>
        <div class="row">
          <button class="primary" @click="updateQuery()">
            Filter
          </button>
        </div>

      </div>
    </q-drawer>



    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <div class="layout-view">
      <div>
        <h2>Hello and Welcome</h2>
        <div class="card" v-for="product in products">
          <progressive-img :src="'https://www.vegapo.sk/uploads/products/sk/450x450/'+product.image" />
          <div class="card-content">
            {{ product.name }}
          </div>
        </div>
        <q-pagination
          v-model="currentPage"
          :max="numberOfPages"
          @input="updateQuery(true)"
        ></q-pagination>
      </div>
    </div>
  </q-layout>
</template>

<script>
import axios from 'axios'
import { Loading } from 'quasar'

export default {
  data () {
    return {
      products: {},
      currentPage: 1,
      numberOfPages: 0,
      selectedCategory: '',
      selectCategory: [],
      selectedSupermarket: '',
      selectSupermarket: [],
      selectedTag: '',
      selectTag: [],
      currentSearch: ''
    }
  },
  computed: {

  },
  methods: {
    fetchProducts (query) {
      Loading.show({
        delay: 0 // milliseconds
      })
      this.products = {}
      var url = 'https://vegapo.sk/api/produkty'
      if (query) {
        url += query
      }

      console.log(url)

      axios.get(url).then(response => {
        console.log(response.data)
        this.products = response.data.products
        response.data.categories.forEach(this.addCategory)
        response.data.supermarkets.forEach(this.addSupermarket)
        response.data.tags.forEach(this.addTag)
        if (this.currentPage === 0 || this.numberOfPages !== response.data.number_of_pages) {
          this.currentPage = 1
          this.numberOfPages = parseInt(response.data.number_of_pages)
        }
      }).catch(e => {
        console.log(e)
      })
      Loading.hide()
    },
    updateQuery (page = null) {
      var q = '?supermarket=' + this.selectedSupermarket + '&kategoria=' + this.selectedCategory + '&tag=' + this.selectedTag + '&hladat=' + this.currentSearch
      if (page) {
        q += '&p=' + this.currentPage
      }
      this.fetchProducts(q)
    },
    addCategory (category) {
      var c = {}
      c.label = category.name
      c.value = category.slug
      this.selectCategory.push(c)
    },
    addSupermarket (supermarket) {
      var c = {}
      c.label = supermarket.name
      c.value = supermarket.slug
      this.selectSupermarket.push(c)
    },
    addTag (tag) {
      var c = {}
      c.label = tag.name
      c.value = tag.slug
      this.selectTag.push(c)
    }
  },
  mounted () {
    this.fetchProducts()
    this.selectSupermarket.push({label: 'Všetky Supermarkety', value: ''})
    this.selectCategory.push({label: 'Všetky Kategórie', value: ''})
    this.selectTag.push({label: 'Všetky Tagy', value: ''})
  },
  beforeDestroy () {
  }
}
</script>

<style lang="sass">

</style>
