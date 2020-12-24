<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Join a Game</h2>
    <br />
    <v-divider></v-divider>
    <br />
    <v-form v-on:submit.prevent="onSubmit">
      <p v-if="error">
        <strong class="ml-2 font-weight-medium red--text">
          Could not find quiz
        </strong>
      </p>
      <v-text-field
        class="ml-2"
        v-model="quizPin"
        label="Enter the 4 Character Quiz Pin Provided by the Host"
        counter="4"
        outlined
        required
        @keyup="onKey"
      />
      <v-btn class="ml-2 success" @click="onSubmit">Join Quiz</v-btn>
    </v-form>
  </div>
</template>
<script>
import * as quizService from '../../services/QuizService'
import * as auth from '../../services/AuthService'
export default {
  name: 'JoinQuiz',
  data: function() {
    return {
      quizPin: '',
      pinLength: 4,
      notFound: false,
      error: false,
    }
  },
  methods: {
    onSubmit: async function() {
      this.error = false
      this.$socket.client.emit('joinRoom', {
        pin: this.quizPin,
        user: { username: this.$store.state.username, host: false },
      })
    },
    onKey: function() {
      if (this.quizPin.length >= this.pinLength) {
        this.quizPin = this.quizPin.slice(0, this.pinLength)
      }
    },
  },
  sockets: {
    roomNotFound: function() {
      this.error = true
    },
    roomFound: async function(data) {
      await quizService.updateGame({
        username: auth.getUsername(),
        _id: auth.getUserId(),
        isAdmin: auth.isAdmin(),
        isHost: false,
        pin: data.pin,
      })
      this.$router.push({ name: 'QuizQueue' })
    },
  },
  created: function() {
    if (!this.$store.state.isLoggedIn) {
      this.$router.push({ name: 'Home' })
    }
  },
}
</script>
