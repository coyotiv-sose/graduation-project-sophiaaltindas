<script>
import axios from 'axios'
import { useAccountStore } from '../stores/account'
import { mapState } from 'pinia'

import { RouterLink } from 'vue-router'

axios.defaults.withCredentials = true

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'MyMeetingsView',
  components: {},
  data() {
    return {
      meetings: []
      //myMeetings: []
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
    myMeetings() {
      return this.meetings.filter((meeting) => meeting.createdBy._id === this.user._id)
    }
  },
  async mounted() {
    const { data: meetings } = await axios.get('/meetings')
    this.meetings = meetings
  }
}
</script>

<template lang="pug">
.meetings
  h1 Meetings
  h2 Welcome!

  ul
    li(v-for='meeting in myMeetings' :key='meeting.id')
      | {{ meeting.name }} at {{ meeting.location }} on {{ meeting.date }}
</template>
