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
      loading: false,
      meeting: null
    }
  },
  async created() {
    await this.fetchMeeting()
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
    attendeeIds() {
      return this.meeting.attendees.map((attendee) => attendee._id)
    }
  },
  methods: {
    async fetchMeeting() {
      this.loading = true
      this.meeting = (await axios.get(`/meetings/${this.$route.params.id}`)).data
      this.loading = false
    },
    async joinMeeting() {
      await axios.post(`/meetings/${this.$route.params.id}/attendees`)
      await this.fetchMeeting()
    },
    async leaveMeeting() {
      await axios.delete(`/meetings/${this.$route.params.id}/attendees`)
      await this.fetchMeeting()
    },
    async deleteMeeting() {
      await axios.delete(`/meetings/${this.$route.params.id}`)
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <div v-if="loading">
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
      <b-button
        v-if="attendeeIds.includes(user._id)"
        pill
        variant="outline-info"
        @click="leaveMeeting"
      >
        Leave Meeting
      </b-button>
      <b-button v-else pill variant="outline-info" @click="joinMeeting">Join Meeting</b-button>

      <b-button
        v-if="meeting.createdBy._id == user._id"
        pill
        variant="outline-danger"
        @click="deleteMeeting"
        style="margin-left: 10px"
        >Delete Meeting</b-button
      >
    </b-col>
  </b-row>
</template>
