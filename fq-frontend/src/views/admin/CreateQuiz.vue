<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Create a Quiz</h2>
    <br />
    <v-divider></v-divider>
    <br />
    <v-form class="pb-3">
      <h4 class="ml-2 subtitle-2">Enter Quiz Topic</h4>
      <v-text-field
        class="ml-2"
        v-model="topic"
        label="Quiz Topic"
        outlined
        required
      />
      <h3 class="ml-2 mb-3">
        Enter Quiz Questions (Up to {{ maxQuestions }} are allowed)
      </h3>
      <div class="mb-2" v-for="(quiz, index) in quizQA" :key="index">
        <v-text-field
          class="ml-2"
          v-model="quiz.question"
          :label="`Question ${index + 1}:`"
          outlined
          required
        />
        <v-text-field
          class="ml-2"
          v-model="quiz.answer"
          :label="`Answer ${index + 1}:`"
          outlined
          required
        />
      </div>
      <v-dialog v-model="dialog" max-width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" class="ml-2 success"
            >Submit Quiz</v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            Create Quiz
          </v-card-title>
          <v-card-text>
            <p>Are you finished creating quiz '{{ topic }}'</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="onSubmit" class="success">Submit</v-btn>
            <v-btn @click="dialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn class="ml-5" @click="addQuestion">Add Question</v-btn>
      <v-btn class="ml-5" @click="removeQuestion">Remove Last Question</v-btn>
    </v-form>
  </div>
</template>
<script>
import * as quizService from '../../services/QuizService'
export default {
  name: 'crete-quiz',
  data: function() {
    return {
      maxQuestions: 20,
      quizQA: [],
      topic: '',
      dialog: false,
    }
  },
  methods: {
    addQuestion: function() {
      if (this.quizQA.length < this.maxQuestions) {
        this.quizQA.push({ question: '', answer: '' })
      }
    },
    removeQuestion: function() {
      this.quizQA.pop()
    },
    onSubmit: function() {
      const newQuiz = {
        topic: this.topic,
        quizQA: this.quizQA,
      }
      quizService.createQuiz(newQuiz)
      this.$router.push({ name: 'AdminPage' })
    },
  },
  created: function() {
    if (!this.$store.state.isAdmin) {
      this.$router.push({ name: 'Home' })
    }
  },
}
</script>
