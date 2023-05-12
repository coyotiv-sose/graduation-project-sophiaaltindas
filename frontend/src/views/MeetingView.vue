<script>
import axios from 'axios'
import CounterOptionsApi from '../components/CounterOptionsApi.vue'
import User from '../components/User.vue'
import { useAccountStore } from '../stores/account'
import { mapActions, mapState } from 'pinia'

axios.defaults.withCredentials = true

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'MeetingDetail',
  components: {
    CounterOptionsApi,
    User
  },
  data() {
    return {
      meeting: null
    }
  },
  async created() {
    const { data: meeting } = await axios.get(
      `/meetings/${this.$route.params.id}`
    )
    this.meeting = meeting
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template lang="pug">
div(v-if="!meeting")
  p Loading...
div(v-else)
  h2 Meeting {{meeting.name}}

  h3 at {{meeting.location}} on {{meeting.date}}

  p {{meeting.attendees.length}} people are attending:

  ul
    li(v-for="attendee in meeting.attendees" :key="attendee._id") {{ attendee.name }}


</template>
