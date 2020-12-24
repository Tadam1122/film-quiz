<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Select a Quiz to Edit</h2>
    <v-form>
      <div v-if="quizzes.length > 0">
        <v-btn
          v-for="quiz of quizzes"
          :key="quiz.topic"
          @click="editQuiz(quiz)"
          class="my-3 ml-2"
          >{{ quiz.topic }}</v-btn
        >
      </div>
      <p v-else class="ml-2 my-3 font-weight-medium text--red">
        Loading Quizzes...
      </p>
      <br />
      <v-divider></v-divider>
      <br />
      <h2 class="display-3 text-uppercase grey--text">Create a New Quiz</h2>
      <v-btn class="my-3 ml-2" @click="createQuiz">New Quiz</v-btn>
    </v-form>
  </div>
</template>
<script>
import * as quizService from '../../services/QuizService'
export default {
  name: 'AdminQuiz',
  data: function() {
    return {
      quizPin: '',
      pinLength: 4,
      quizzes: [],
      response: null,
    }
  },
  methods: {
    onSubmit: function() {
      console.log('No quizzes found')
      //todo: once quiz is generated, push to quiz queue
      //include generated quiz array in props
    },
    onKey: function() {
      console.log(this.quizPin)
      if (this.quizPin.length >= this.pinLength) {
        this.quizPin = this.quizPin.slice(0, this.pinLength)
      }
    },
    createQuiz: function() {
      this.$router.push({ name: 'CreateQuiz' })
    },
    editQuiz: function(quiz) {
      this.$router.push({ name: 'EditQuiz', params: { quizReq: quiz } })
    },
  },
  created: function() {
    if (!this.$store.state.isAdmin) {
      this.$router.push({ name: 'Home' })
    }
  },
  mounted: async function() {
    let quizReq = await quizService.getQuizzes()
    this.quizzes = this.quizzes.concat(quizReq.data)
  },
}
</script>
