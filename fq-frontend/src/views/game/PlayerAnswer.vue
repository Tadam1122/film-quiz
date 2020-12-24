<template>
  <div>
    <div v-if="!pointsUpdated">
      <h2 class="display-3 text-uppercase grey--text">Host Rating Answers</h2>
      <br />
      <v-divider></v-divider>
      <br />
      <span class="ml-2 mb-5 display-1">Players answers</span>
      <ul v-if="players.length > 0" style="list-style-type:none;">
        <li v-for="player of players" :key="player.username">
          <h3 class="ml-2 font-weight-light">
            {{ player.username }}: {{ player.answer }}
          </h3>
        </li>
      </ul>
      <br />
      <v-divider></v-divider>
      <br />
      <h3 class="ml-2 font-weight-light">
        The correct answer is <strong>'{{ answer }}'</strong>
      </h3>
      <h3 class="ml-2 font-weight-light">
        Please wait while host rates all answers...
      </h3>
    </div>
    <div v-else>
      <h2 class="display-3 text-uppercase grey--text">Updated Points</h2>
      <br />
      <v-divider></v-divider>
      <br />
      <h3 class="font-weight-light">
        Next question will apprear in {{ time }} seconds...
      </h3>
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
  name: 'PlayerAnswer',
  props: ['question'],
  data: function() {
    return {
      players: [],
      answer: this.question.answer,
      pointsUpdated: false,
      host: '',
      time: 0,
    }
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
    getPoints: function(data) {
      let notHost = []
      for (let user of data.users) {
        if (!user.host) {
          notHost.push(user)
        }
      }
      this.players = notHost.sort((a, b) => (a.points < b.points ? 1 : -1))
      this.pointsUpdated = true
      this.time = 10
    },
    sendHost: function(data) {
      this.host = data.user
    },
    nextQuestion: function(data) {
      this.$router.push({
        name: 'PlayerQuestion',
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
