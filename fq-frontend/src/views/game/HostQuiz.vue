<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Host a Game</h2>
    <br />
    <v-divider></v-divider>
    <br />
    <v-form>
      <p class="ml-2 subtitle-1">Select the topic of your quiz</p>
      <div v-if="quizzes.length > 0">
        <v-btn-toggle group>
          <v-btn
            v-for="quiz of quizzes"
            :key="quiz.topic"
            @click="selectQuiz(quiz)"
            class="my-3 ml-2"
            elevation="1"
          >
            {{ quiz.topic }}
          </v-btn>
        </v-btn-toggle>
      </div>
      <div v-else>
        <h3 class="font-weight-light ml-2">Loading Quizzes...</h3>
      </div>
      <br />
      <div>
        <v-btn class="ml-2 mt=5 success" elevation="1" @click="createGame">
          Host Quiz
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
import * as quizService from '../../services/QuizService'
import * as auth from '../../services/AuthService'
import * as pinUtil from '../../utilities/pin'

export default {
  name: 'HostQuiz',
  data: function() {
    return {
      quizPin: '',
      pinLength: 4,
      quizzes: [],
      selectedQuiz: null,
      toggleExclusive: 2,
      pin: null,
      socket: null,
    }
  },
  methods: {
    selectQuiz: function(quiz) {
      this.selectedQuiz = quiz
    },
    createGame: async function() {
      if (this.selectedQuiz && this.pin) {
        //store user info and game pin in store
        await quizService.updateGame({
          username: auth.getUsername(),
          _id: auth.getUserId(),
          isAdmin: auth.isAdmin(),
          isHost: true,
          pin: this.pin,
        })
        //send pin and quiz data
        this.$socket.client.emit('newRoom', {
          pin: this.pin,
          quiz: this.selectedQuiz,
          quizLength: this.selectedQuiz.quizQA.length,
          questionNo: 0,
          users: [
            { username: this.$store.state.username, host: true, points: 0 },
          ],
        })
      }
    },
  },
  sockets: {
    newRoomCreated: function() {
      this.$router.push({ name: 'QuizQueue' })
    },
  },
  created: function() {
    if (!this.$store.state.isLoggedIn) {
      this.$router.push({ name: 'Home' })
    }
  },
  mounted: async function() {
    let quizReq = await quizService.getQuizzes()
    this.quizzes = this.quizzes.concat(quizReq.data)
    this.pin = pinUtil.randomPinGenerator(this.pinLength)
  },
}
</script>
