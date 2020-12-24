<template>
  <div>
    <div>
      <h1 class="display-3 text-uppercase grey--text">
        <span class="font-weight-light">Film</span>Quiz
      </h1>
      <br />
      <v-divider></v-divider>
      <br />
    </div>
    <div>
      <div v-if="$store.state.isLoggedIn">
        <v-btn class="mr-3 mb-5" router to="/join-quiz">Join a Quiz</v-btn>
        <v-btn class="mr-3 mb-5" router to="/host-quiz">Host a Quiz</v-btn>
      </div>
      <div v-else>
        <v-btn class="mr-3 mb-5" router to="/login">Login</v-btn>
        <v-btn class="mr-3 mb-5" router to="/register">Register</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
