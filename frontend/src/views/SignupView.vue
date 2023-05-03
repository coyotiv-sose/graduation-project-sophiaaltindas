<script>
import axios from 'axios'
import { mapActions } from 'pinia'

export default {
  name: 'SignupView',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async doSignup() {
      await axios.post('http://localhost:3000/users', {
        name: this.name,
        email: this.email,
        password: this.password
      })
      this.$router.push('/login')
    }

    // ...mapActions(useAccountStore, ['login']),
    // async doLogin() {
    //   await this.login(this.email, this.password)
    //   this.$router.push('/')
    // }
  }
}
</script>

<template lang="pug">
h2 Sign up

form(@submit.prevent="doSignup")
  div
    b-form-input(id="input-0" v-model="name" type="text" placeholder="Enter your name" required)
  div
    //- label(for="email") Email:
    //- input#email(v-model="email" type="text" required)
    b-form-input(id="input-1" v-model="email" type="email" placeholder="Enter email" required)

  div
    //- label(for="password") Password:
    //- input#password(v-model="password" type="password" required)
    b-form-input(id="input-2" v-model="password" type="password" placeholder="Enter password" required)

    b-button(variant="outline-primary" type="submit") Sign up

</template>
