<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Question {{ num }}</h2>
    <br />
    <v-divider></v-divider>
    <br />
    <div class="ml-2">
      <div v-if="!submitted">
        <p class="display-1">{{ num }}: {{ quizQuestion }}</p>
        <v-text-field
          v-model="playerAnswer"
          label="Write your Answer"
          :rules="answerRules"
          outlined
          required
        ></v-text-field>
      </div>
      <div v-else>
        <h3 class="ml-2 mb-5 font-weight-light">
          Please wait for the reminaing players to submit their answers
        </h3>
      </div>
      <v-btn class="success" v-if="!submitted" @click="onSubmit"
        >Submit Answer</v-btn
      >
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
      playerAnswer: '',
      submitted: false,
      answerRules: [(v) => !!v || 'Answer is required.'],
      dialog: false,
    }
  },
  methods: {
    onSubmit: function() {
      this.$socket.client.emit('submitAnswer', {
        pin: this.$store.state.pin,
        answer: this.playerAnswer,
        question: this.question,
      })
      this.submitted = true
    },
  },
  mounted: function() {
    let notHost = []
    for (let user of this.users) {
      if (!user.host) {
        notHost.push(user)
      }
    }
    this.players = notHost
  },
  sockets: {
    playersReady: function(data) {
      this.$router.push({
        name: 'PlayerAnswer',
        params: { question: data.question },
      })
    },
  },
}
</script>
