<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>
<script>
import axios from 'axios'
import { useAccountStore } from '../stores/account'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'HomeView',
    async mounted() {
    await this.fetchUser()
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout']),
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
  }
}
</script>

<template lang="pug">
h2 Hello , {{ user?.name }}!
h3 Below you can find the latest meetings:



</template>
