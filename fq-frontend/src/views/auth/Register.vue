<template>
  <div>
    <h2 class="display-3 text-uppercase grey--text">Register</h2>
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
            :rules="usernameRules" 
            label="Username" 
            outlined 
            required 
        />
      <v-text-field
            class="ml-2"
            v-model="password"
            :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPW ? 'text' : 'password'"
            label="Password"
            outlined
            @click:append="showPW = !showPW"
      />
      <v-btn class="ml-2" :disabled="!valid" color="success" @click="onSubmit">
        Register
    </v-btn>  
    </v-form>
  </div>
</template>
<script>
import * as auth from '../../services/AuthService'
export default {
  name: 'Register',
  data: function () {
    return {
      username: '',
      password: '',
      errors: [],
      showPW: false,
      valid: true,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 18) || 'Username must be less than 18 characters',
        v => (v && v.length > 3) || 'Username must be greater than 3 characters'
      ],
      passwordRules: [v => !!v || 'Password is required']
    }
  },
  methods: {
    onSubmit: async function () {
      //check form
      this.errors = []
      const user = {
        username: this.username,
        password: this.password,
      }
      const register = await auth.registerUser(user)
      if (register.status < 200 || register.status > 300) {
        for(let error of register.data.message.split('.')){
          if(error.length > 1) this.errors.push({message: `${error}.`})
        }
      }
      else{
        await auth.login(user)
        this.$router.push({ name: 'Home' })
      }
      
    },
  },
}
</script>
