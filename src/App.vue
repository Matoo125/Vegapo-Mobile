<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">


  	<Sceleton></Sceleton>
     <!--  <router-view></router-view> -->
  </div>
</template>

<script>
/*
 * Root component
 */
import Sceleton from 'components/Sceleton.vue'
export default {
  components: {
    Sceleton
  }
}
</script>

<style></style>
