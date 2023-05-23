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
    const { data: meeting } = await axios.get(`/meetings/${this.$route.params.id}`)
    this.meeting = meeting
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    async joinMeeting() {
      await axios.post(`/meetings/${this.$route.params.id}/attendees`)
      this.meeting = (await axios.get(`/meetings/${this.$route.params.id}`)).data
    }
  }
}
</script>

<template>
  <div v-if="!meeting">
    <p>Loading...</p>
  </div>
  <b-row v-else>
    <b-col cols="4">
      <div>
        <h2>Meeting {{ meeting.name }}</h2>
        <h3>at {{ meeting.location }} on {{ meeting.date }}</h3>
        <h5>Description: {{ meeting.description }}</h5>
        <p>{{ meeting.attendees.length }} people are attending:</p>
        <ul>
          <li v-for="attendee in meeting.attendees" :key="attendee._id">{{ attendee.name }}</li>
        </ul>
      </div>
    </b-col>

    <b-col cols="8">
      <b-button pill variant="outline-info" @click="joinMeeting"> Join Meeting </b-button>
    </b-col>
  </b-row>
</template>
