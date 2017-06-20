<template>
  <div>
  	<div class="card">
	  <img :src="'https://vegapo.sk/uploads/products/sk/' + product.image">
	  <div class="card-content">
	    <h2>{{ product.name }}</h2>
	    <p>{{ product.category }}</p>
	    <p>{{ product.tags }}</p>
	    <p>{{ product.supermarkets }}</p>
	    <p>{{ product.note }}</p>
	  </div>
	</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      product: {}
    }
  },
  created () {
    console.log(this.$route ? 'route is defined' : 'route is not defined')
    this.fetchProduct(this.$route.params.slug)
  },
  watch: {
    '$route': 'fetchProduct'
  },
  methods: {
    fetchProduct (slug) {
      let self = this
      console.log(slug)
      console.log('Fetching from: ' + 'https://vegapo.sk/produkty/produkt/' + slug)
      axios.get('https://vegapo.sk/api/produkty/produkt/' + slug)
        .then(function (response) {
          self.product = response.data.product
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
