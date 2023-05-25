<script>
import axios from 'axios'
import { useAccountStore } from '../stores/account'
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import { Country } from 'country-state-city'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'HomeView',
  components: {
    RouterLink
  },
  data() {
    return {
      meetings: [],
      location: Country.getAllCountries(),
      show: false,
      variants: ['primary'],
      headerTextVariant: 'light',
      name: '',
      selectedCountry: '',
      date: '',
      limit: 2,
      description: ''
    }
  },
  async created() {
    console.log('HomeView mounted')
    await this.fetchUser()
    this.meetings = (await axios.get('/meetings')).data
  },

  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout']),
    showdetails(meetingId) {
      this.$router.push(`/meetings/${meetingId}`)
    },

    async createMeeting() {
      await axios.post('/meetings', {
        name: this.name,
        location: this.selectedCountry,
        date: this.date,
        limit: this.limit,
        description: this.description
      })
      this.meetings = (await axios.get('/meetings')).data
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<!-- <template lang="pug">
h2 Hello , {{ user?.name }}!
h3 Below you can find the latest meetings:

ul
  li(v-for="meeting in meetings" :key="meeting._id")
    RouterLink(:to="`/meetings/${meeting._id}`") {{ meeting.name }} at {{ meeting.location }} on {{ meeting.date }}
    Button(@click="showdetails(`${meeting._id}`)") Show Details

Button(@click="show=true" variant="primary") Create new Meeting

</template> -->
<template>
  <h2>Hello , {{ user?.name }}!</h2>
  <h3>Below you can find the latest meetings:</h3>
  <b-container>
    <ul>
      <li v-for="meeting in meetings" :key="meeting._id">
        <b-row>
          <b-col cols="4">
            <router :to="`/meetings/${meeting._id}`"
              >{{ meeting.name }} at {{ meeting.location }} on {{ meeting.date }}
            </router>
          </b-col>
          <b-col cols="8">
            <b-button pill variant="outline-info" @click="showdetails(`${meeting._id}`)"
              >Show Details</b-button
            >
          </b-col>
        </b-row>
      </li>
    </ul>
  </b-container>

  <div>
    <b-button block variant="primary" @click="show = true">Create new Meeting</b-button>
  </div>
  <b-modal v-model="show" title="Create new Meeting" ok-title="Create" @ok="createMeeting">
    <b-container fluid>
      <b-row class="mb-1 text-center">
        <b-col cols="3"></b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="4">Select Location</b-col>
        <b-col>
          <b-form-select v-model="selectedCountry">
            <b-form-select-option
              v-for="country in location"
              :key="country.isoCode"
              :value="country.name"
              :text="country.name"
            ></b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="4" for="datepicker">Choose a date</b-col>
        <b-col>
          <!-- <b-form-datepicker
            id="datepicker"
            v-model="date"
            class="mb-2"
            @change="changeDate"
          ></b-form-datepicker> -->
          <input type="date" v-model="date" />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">Type Name</b-col>
        <b-col>
          <b-input-group>
            <b-form-input
              v-model="name"
              placeholder="Enter your meetings' city location"
            ></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">Type Description</b-col>
        <b-col>
          <b-input-group>
            <b-form-input v-model="description" placeholder="Enter text"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">Limit your meetings' attendees</b-col>
        <b-col>
          <b-input-group>
            <b-form-input
              v-model="limit"
              type="number"
              placeholder="Enter number"
              min="2"
              max="10"
            ></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
