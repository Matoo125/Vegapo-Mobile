<template>
  <q-layout>
  <!--   <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="0">
        Vegapo
      </q-toolbar-title>
    </div>  
      <!-- Left side Drawer -->
    <!-- <q-drawer ref="leftDrawer">
      <div class="list platform-delimiter">
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
    </q-drawer>  -->

    <router-view class="layout-view"></router-view>

    <!-- Footer
    <div slot="footer" class="toolbar"></div>
    -->
  </q-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      supermarkets: {},
      categories: {},
      tags: {}
    }
  },
  methods: {},
  computed: {},
  mounted () {
    var parent = this
    if (typeof this.$store.state.supermarkets === 'object' &&
        Object.keys(this.$store.state.supermarkets).length === 0) {
      axios.get('https://vegapo.sk/api/obchody')
        .then(function (response) {
          console.log(response.data.stores)
          parent.$store.commit('SET_SUPERMARKETS', response.data.stores)
          parent.supermarkets = response.data.stores
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
