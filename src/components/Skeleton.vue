<template>
  <q-layout>
    <!-- <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="0">
        Vegapo
      </q-toolbar-title>
    </div>  -->
      <!-- Left side Drawer -->
  <!--   <q-drawer ref="leftDrawer">
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
    </q-drawer> -->

    <router-view class="layout-view"></router-view>

    <!-- Footer
    <div slot="footer" class="toolbar"></div>
    -->
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    if (Object.keys(this.$store.state.supermarkets).length === 0) {
      this.$store.commit('SET_SUPERMARKETS', 'hello')
      alert('hi')
    }
    if (Object.keys(this.$store.state.categories).length === 0) {
      this.$store.commit('SET_CATEGORIES', 'hello')
      alert('hi')
    }
    if (Object.keys(this.$store.state.tags).length === 0) {
      this.$store.commit('SET_TAGS', 'hello')
      alert('hi')
    }
  }
}
</script>

<style>
</style>
