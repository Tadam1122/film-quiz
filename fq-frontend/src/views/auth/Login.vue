<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Login</h2>
    <br />
    <v-divider></v-divider>
    <br />
    <v-form ref="form" v-model="valid" lazy-validation>
      <p v-if="errors.length">
          <strong class="font-weight-medium red--text">Please correct the following error(s):</strong>
          <ul style="list-style-type: none;">
            <li v-for="error of errors" :key="error.message" class="font-weight-light red--text">{{ error.message }}</li>
          </ul>
        </p>
      <v-text-field 
            class="ml-2" 
            v-model="username"  
            label="Username" 
            outlined 
            required 
      />
      <v-text-field
            class="ml-2"
            v-model="password"
            :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPW ? 'text' : 'password'"
            label="Password"
            outlined
            @click:append="showPW = !showPW"
      />
      <v-btn class="ml-2" :disabled="!valid" color="success" @click="onSubmit">
        Login
      </v-btn>  
    </v-form>
  </div>
</template>
<script>
import * as auth from '../../services/AuthService'
export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: '',
      email: '',
      errors: [],
      showPW: false,
      valid: true
    }
  },
  methods: {
    onSubmit: async function () {
    this.errors = []
      const user = {
        username: this.username,
        password: this.password,
      }

      //login returns error if any
      const login = await auth.login(user)
      if (login) {
        for(let error of login.data.message.split('.')){
          if(error.length > 1) this.errors.push({message: `${error}.`})
        }
      }else{
          this.$router.push({ name: 'Home' })
      }
    }
  },
}
</script>
