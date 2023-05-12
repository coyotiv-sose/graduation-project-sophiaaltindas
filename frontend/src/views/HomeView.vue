<script>
import axios from 'axios'
import { useAccountStore } from '../stores/account'
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    RouterLink
  },
  data() {
    return {
      meetings: []
    }
  },
  async created() {
    console.log('HomeView mounted')
    await this.fetchUser()
    this.meetings = (await axios.get('http://localhost:3000/meetings')).data
  },

  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout']),
    showdetails(meetingId) {
      this.$router.push(`/meetings/${meetingId}`)
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
  }
}
</script>

<template lang="pug">
h2 Hello , {{ user?.name }}!
h3 Below you can find the latest meetings:

ul
  li(v-for="meeting in meetings" :key="meeting._id")
    RouterLink(:to="`/meetings/${meeting._id}`") {{ meeting.name }} at {{ meeting.location }} on {{ meeting.date }}
    Button(@click="showdetails(`${meeting._id}`)") Show Details
</template>
