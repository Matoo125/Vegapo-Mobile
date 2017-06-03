<template>
  <q-layout>

    <div class="layout-view">
      <div>
        <div class="row wrap gutter sm-column">
          <div class="card product width-1of5" v-for="product in products">
            <router-link :to="{name: 'product', params: {slug: product.slug}}">
              <progressive-img :src="'https://www.vegapo.sk/uploads/products/sk/450x450/'+product.image" />
              <div class="card-content">
                {{ product.name }}
              </div>
            </router-link>
            </div>
        </div>
        <q-pagination
          v-model="selected.page"
          :max="numberOfPages"
          @input="FETCH_PRODUCTS(true)"
        ></q-pagination>
      </div>
    </div> 
  </q-layout> 
</template>

<script>
// import { Loading } from 'quasar'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: mapState([
    'products',
    'numberOfPages',
    'selected'
  ]),
  methods: {
    ...mapActions([
      'FETCH_PRODUCTS'
    ])
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
.product {
  max-width: 450px !important
}
</style>
