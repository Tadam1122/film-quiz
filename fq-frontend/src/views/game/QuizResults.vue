<template>
  <div>
    <!-- TODO: get and display results -->
    <h2 class="display-3 text-uppercase grey--text">Results</h2>
    <br />
    <v-divider></v-divider>
    <br />
    <div>
      <h3 class="ml-2 mb-5 display-1">
        {{ players[0].username }} won, congratulations!
      </h3>
      <h3 class="ml-2 mb-2 font-weight-light">
        Game was hosted by {{ host.username }}.
      </h3>
      <ol>
        <li class="ml-2" v-for="player of players" :key="player.username">
          {{ player.username }}: {{ player.points }}
        </li>
      </ol>
    </div>
    <v-btn class="ml-2 success mt-5" @click="exitGame">Exit Game</v-btn>
  </div>
</template>
<script>
import * as quizService from '../../services/QuizService'
import * as auth from '../../services/AuthService'

export default {
  name: 'QuizResults',
  props: ['users'],
  data: function() {
    return {
      players: '',
      host: '',
    }
  },
  methods: {
    exitGame: async function() {
      await quizService.updateGame({
        username: auth.getUsername(),
        _id: auth.getUserId(),
        isAdmin: auth.isAdmin(),
        isHost: false,
        pin: null,
      })
      this.$router.push({ name: 'Home' })
    },
  },
  mounted: function() {
    let notHost = []
    for (let user of this.users) {
      if (user.host) {
        this.host = user
      } else {
        notHost.push(user)
      }
    }
    this.players = notHost.sort((a, b) => (a.points < b.points ? 1 : -1))
  },
}
</script>
