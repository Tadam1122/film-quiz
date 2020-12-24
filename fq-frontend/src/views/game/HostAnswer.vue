<template>
  <div>
    <div v-if="players.length > 0 && !pointsUpdated">
      <h2 class="display-3 text-uppercase grey--text">Award Points</h2>
      <br />
      <v-divider></v-divider>
      <br />
      <h3 class="ml-2 font-weight-light">
        The correct answer is <strong>'{{ answer }}'</strong>
      </h3>
      <h3 class="ml-2 mb-5 font-weight-light">
        Give points to players based off their answers.
      </h3>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div v-for="player of players" :key="player.username">
          <p class="ml-2">
            {{ player.username }}'s answer: <strong>{{ player.answer }}</strong>
          </p>
          <v-text-field
            class="ml-2"
            v-model="player.newPoints"
            :rules="rules"
            label="Rate players Answer"
            outlined
          ></v-text-field>
        </div>
        <v-btn class="ml-2 success" :disabled="!valid" @click="sendPoints"
          >Submit Points</v-btn
        >
      </v-form>
    </div>
    <div v-else>
      <h2 class="display-3 text-uppercase grey--text">Updated Points</h2>
      <br />
      <v-divider></v-divider>
      <br />
      <h3 class="font-weight-light">
        Next question will apprear in {{ time }} seconds...
      </h3>
      <!-- TODO: add updated points -->
      <div>
        <ul v-if="players.length > 0" style="list-style-type:none;">
          <li v-for="player of players" :key="player.username">
            <h3 class="ml-2 font-weight-light">
              {{ player.username }}: {{ player.points }} (+{{
                player.newPoints
              }})
            </h3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HostAnswer',
  props: ['question'],
  data: function() {
    return {
      players: [],
      host: this.$store.state.username,
      rules: [
        (value) => !!value || 'Rating required.',
        (value) => !isNaN(value) || 'Please enter a number.',
        (value) => value <= 5 || 'Rating must be less five or less.',
        (value) => value >= 0 || "Can't give negative ratings.",
      ],
      answer: this.question.answer,
      valid: true,
      pointsUpdated: false,
      time: 0,
    }
  },
  methods: {
    sendPoints: function() {
      console.log(this.players)
      this.$socket.client.emit('submitPoints', {
        pin: this.$store.state.pin,
        users: this.players,
      })
      //update points
      for (let player of this.players) {
        player.points =
          Number.parseFloat(player.points) + Number.parseFloat(player.newPoints)
      }
      this.pointsUpdated = true
      this.time = 10
    },
  },
  mounted: function() {
    this.$socket.client.emit('getAnswers', { pin: this.$store.state.pin })
  },
  watch: {
    time: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.time--
          }, 1000)
        } else {
          this.$socket.client.emit('getQuestion', {
            pin: this.$store.state.pin,
          })
        }
      },
    },
  },
  sockets: {
    recvAnswers: function(data) {
      let allUsers = data.users
      let notHost = []
      for (let user of allUsers) {
        if (!user.host) {
          notHost.push(user)
        }
      }
      this.players = notHost
    },
    nextQuestion: function(data) {
      this.$router.push({
        name: 'HostQuestion',
        params: {
          users: data.users,
          question: data.question,
          quizLength: data.quizLength,
          questionNo: data.questionNo,
        },
      })
    },
    endGame: function(data) {
      this.$router.push({ name: 'QuizResults', params: { users: data.users } })
    },
  },
}
</script>
