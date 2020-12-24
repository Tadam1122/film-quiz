<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Question {{ num }}</h2>
    <br />
    <v-divider></v-divider>
    <br />
    <div class="ml-2">
      <p class="display-1">{{ num }}: {{ quizQuestion }}</p>
      <h3 class="font-weight-light">
        Wait for other players to submit their answers
      </h3>
      <!-- TODO: list all players and mark if they submitted their answers -->
      <ul v-if="players.length > 0" class="mb-4" style="list-style-type:none;">
        <li v-for="player of players" :key="player.username">
          <h3 class="ml-2">
            {{ player.username }}
            <span class="font-weight-light" v-if="player.submitted">
              : Submitted
            </span>
          </h3>
        </li>
      </ul>
      <v-dialog v-model="dialog" max-width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" class="ml-2">View Scores</v-btn>
        </template>
        <v-card>
          <v-card-title>Scores:</v-card-title>
          <v-card-text>
            <ul v-if="players.length > 0" style="list-style-type:none;">
              <li v-for="player of players" :key="player.username">
                <h3 class="ml-2">
                  {{ player.username }}:
                  <span class="font-weight-light">{{ player.points }}</span>
                </h3>
              </li>
            </ul>
          </v-card-text>
          <v-actions>
            <v-btn class="mb-3 ml-2" @click="dialog = false">Close</v-btn>
          </v-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayerQuestion',
  props: ['question', 'users', 'quizLength', 'questionNo'],
  data: function() {
    return {
      quizQuestion: this.question.question,
      num: this.questionNo,
      players: null,
      dialog: false,
    }
  },
  mounted: function() {
    let notHost = []
    for (let user of this.users) {
      if (!user.host) {
        user.submitted = false
        notHost.push(user)
      }
    }
    this.players = notHost
  },

  sockets: {
    playersReady: function(data) {
      this.$router.push({
        name: 'HostAnswer',
        params: { question: data.question },
      })
    },
    answerEntered: function(data) {
      console.log(data)
      for (let player of this.players) {
        if (data.username === player.username) {
          player.submitted = true
        }
      }
    },
  },
}
</script>
