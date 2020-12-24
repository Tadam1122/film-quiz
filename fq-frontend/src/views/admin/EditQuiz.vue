<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">
      Modify {{ modifiedQuiz.topic }}
    </h2>
    <br />
    <v-divider></v-divider>
    <br />
    <v-form class="pb-3">
      <div v-for="(quiz, index) of modifiedQuiz.quizQA" :key="index">
        <h4 class="ml-2 subtitle-2">Question {{ index + 1 }}:</h4>
        <v-text-field
          class="ml-2"
          v-model="quiz.question"
          outlined
          required
        ></v-text-field>
        <h4 class="ml-2 subtitle-2">Answer {{ index + 1 }}:</h4>
        <v-text-field
          class="ml-2 mb-1"
          v-model="quiz.answer"
          outlined
          required
        ></v-text-field>
      </div>
      <v-dialog v-model="dialog" max-width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" class="ml-2 error">Delete Quiz</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <h2>Delete {{ modifiedQuiz.topic }}</h2>
          </v-card-title>
          <v-card-text>
            <p>
              Are you sure you want to delete quiz '{{ modifiedQuiz.topic }}'?
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="deleteQuiz" class="error">Delete</v-btn>
            <v-btn @click="dialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn class="ml-5" @click="updateQuiz">Submit Changes</v-btn>
    </v-form>
  </div>
</template>
<script>
import * as quizService from '../../services/QuizService'
export default {
  name: 'EditQuiz',
  props: ['quizReq'],
  data: function() {
    return {
      modifiedQuiz: this.quizReq,
      dialog: false,
    }
  },
  methods: {
    updateQuiz: async function() {
      await quizService.updateQuiz({
        topic: this.modifiedQuiz.topic,
        quizQA: this.modifiedQuiz.quizQA,
      })
      this.$router.push({ name: 'AdminPage' })
    },
    deleteQuiz: async function() {
      await quizService.deleteQuiz(this.modifiedQuiz._id)
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
