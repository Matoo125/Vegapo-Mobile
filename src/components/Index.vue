<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Vegapo
      </q-toolbar-title>
    </div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <div class="layout-view">
      <div>
        <h2>Hello and Welcome</h2>
        <div class="card" v-for="product in products">
          <img :src="'https://www.vegapo.sk/uploads/products/sk/450x450/'+product.image">
          <div class="card-content">
            {{ product.name }}
          </div>
        </div>
        <q-pagination
          v-model="currentPage"
          :max="numberOfPages"
          @input="alert('123')"
        ></q-pagination>
      </div>
    </div>
  </q-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      products: {},
      currentPage: 0,
      numberOfPages: 0
    }
  },
  computed: {

  },
  methods: {
    fetchProducts (query) {
      var url = 'http://vegapo.dev.sk/api/produkty'
      if (query) {
        url += query
      }

      axios.get(url).then(response => {
        console.log(response.data)
        this.products = response.data.products

        if (this.currentPage === 0) {
          this.currentPage = response.data.current_page
          this.numberOfPages = response.data.number_of_pages
        }

      }).catch(e => {
        console.log(e)
      })
    },
    alert (text) {
      this.fetchProducts('?p=' + this.currentPage)
    }
  },
  mounted () {
    this.fetchProducts()
  },
  beforeDestroy () {
  }
}
</script>

<style lang="css">

</style>
