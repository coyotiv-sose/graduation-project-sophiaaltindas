<script>
import axios from 'axios'
import { useAccountStore } from '../stores/account'
import { mapActions } from 'pinia'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    // async login() {
    //   const { data: user } = await axios.post('http://localhost:3000/accounts/session', {
    //     email: this.email,
    //     password: this.password
    //   })
    //   this.$store.user = user
    //   this.$router.push('/')
    // }

    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login(this.email, this.password)
      this.$router.push('/')
    }
  }
}
</script>

<template lang="pug">
h2 Log in to your account

form(@submit.prevent="doLogin")
  div
    //- label(for="email") Email:
    //- input#email(v-model="email" type="text" required)
    b-form-input(id="input-1" v-model="email" type="email" placeholder="Enter email" required)

  div
    //- label(for="password") Password:
    //- input#password(v-model="password" type="password" required)
    b-form-input(id="input-2" v-model="password" type="password" placeholder="Enter password" required)

    //button.btn.btn-primary(type="submit") Log in
    b-button(variant="outline-primary" type="submit") Log in

</template>
