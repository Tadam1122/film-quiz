<template>
  <nav>
    <v-app-bar app flat dense>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Film</span>Quiz
        <span v-if="$store.state.isLoggedIn" class="ml-2 font-weight-light">
          Welcome {{ $store.state.username }}
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="grey darken-2">
      <v-list>
        <v-list-item-group
          v-model="selectedItem"
          color="white"
          v-if="$store.state.isLoggedIn"
        >
          <v-list-item
            v-for="(item, i) in linksLogin"
            :key="i"
            router
            :to="item.route"
          >
            <v-list-item-content>
              <v-list-item-title
                class="white--text"
                v-text="item.text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item router to="/admin-page" v-if="$store.state.isAdmin">
            <v-list-item-content>
              <v-list-item-title class="white--text">
                Admin Page
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-on:click.prevent="logout" href="#">
            <v-list-item-content>
              <v-list-item-title class="white--text">
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group v-model="selectedItem" color="white" v-else>
          <v-list-item
            v-for="(item, i) in linksLogout"
            :key="i"
            router
            :to="item.route"
          >
            <v-list-item-content>
              <v-list-item-title
                class="white--text"
                v-text="item.text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import * as auth from '../services/AuthService'
export default {
  name: 'NavBar',
  data: function() {
    return {
      drawer: false,
      selectedItem: 0,
      linksLogin: [
        { text: 'Home', route: '/' },
        { text: 'About', route: '/about' },
        { text: 'Join Quiz', route: '/join-quiz' },
        { text: 'Host Quiz', route: '/host-quiz' },
      ],
      linksLogout: [
        { text: 'Home', route: '/' },
        { text: 'About', route: '/about' },
        { text: 'Login', route: '/login' },
        { text: 'Register', route: '/register' },
      ],
    }
  },
  methods: {
    logout: function() {
      auth.logout()
      this.drawer = false
      if (this.$router.currentRoute.name !== 'Home') {
        this.$router.push({ name: 'Home' })
      }
    },
  },
}
</script>
