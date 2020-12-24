<template>
  <v-app>
    <NavBar />
    <v-main class="mt-5 gray lighten-4">
      <router-view class="mx-4" />
    </v-main>
  </v-app>
</template>
<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: { NavBar },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'Film Quiz'
      },
    },
  },
}
</script>
