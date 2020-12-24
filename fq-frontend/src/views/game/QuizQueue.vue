<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Queue</h2>
    <br />
    <v-divider></v-divider>
    <br />
    <div>
      <span class="ml-2 display-1">Joined Users:</span>
      <ul v-if="users.length > 0" style="list-style-type:none;">
        <li v-for="user of users" :key="user">
          <h3 class="ml-2 font-weight-light">{{ user }}</h3>
        </li>
      </ul>
      <br />
      <v-divider></v-divider>
      <br />
    </div>
    <div>
      <h3 class="ml-2 font-weight-light">
        Room Pin: <strong class="font-weight-heavy">{{ pin }}</strong>
      </h3>
      <br />
      <h3 class="ml-2 font-weight-light">
        Share this pin with your friends so they can join.
      </h3>
      <br />
      <h3 class="ml-2 font-weight-light" v-if="!$store.state.isHost">
        Please wait for host to start the game.
      </h3>
    </div>

    <v-btn class="mt-5 success" v-if="$store.state.isHost" @click="gameReady"
      >Begin Quiz</v-btn
    >
  </div>
</template>
<script>
export default {
  name: 'QuizQueue',
  props: ['socket'],
  data: function() {
    return {
      pin: this.$store.state.pin,
      users: [],
    }
  },
  methods: {
    gameReady: function() {
      this.$socket.client.emit('getQuestion', { pin: this.pin })
    },
  },
  mounted: function() {
    this.$socket.client.emit('getUsernames', { pin: this.pin })
  },
  sockets: {
    setUsers: function(data) {
      console.log('users called')
      this.users = data.usernames
    },
    nextQuestion: function(data) {
      if (this.$store.state.isHost) {
        this.$router.push({
          name: 'HostQuestion',
          params: {
            users: data.users,
            question: data.question,
            quizLength: data.quizLength,
            questionNo: data.questionNo,
          },
        })
      } else {
        this.$router.push({
          name: 'PlayerQuestion',
          params: {
            users: data.users,
            question: data.question,
            quizLength: data.quizLength,
            questionNo: data.questionNo,
          },
        })
      }
    },
  },
}
</script>
