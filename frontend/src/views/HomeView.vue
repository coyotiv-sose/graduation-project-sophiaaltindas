<script>
import axios from 'axios'
import { useAccountStore } from '../stores/account'
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import { Country } from 'country-state-city'

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
      headerTextVariant: 'light'
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
  <ul>
    <li v-for="meeting in meetings" :key="meeting._id">
      <router :to="`/meetings/${meeting._id}`"
        >{{ meeting.name }} at {{ meeting.location }} on {{ meeting.date }}</router
      >
      <b-button pill variant="outline-info" @click="showdetails(`${meeting._id}`)"
        >Show Details</b-button
      >
    </li>
  </ul>

  <div>
    <b-button block variant="primary" @click="show = true">Create new Meeting</b-button>
  </div>
  <b-modal v-model="show" title="Create new Meeting">
    <b-container fluid>
      <b-row class="mb-1 text-center">
        <b-col cols="3"></b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="3">Select Location</b-col>
        <b-col>
          <b-form-select>
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
        <b-col for="example-datepicker">Choose a date</b-col>
        <b-col>
          <b-form-datepicker
            id="example-datepicker"
            v-model="value"
            class="mb-2"
          ></b-form-datepicker>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">Type Description</b-col>
        <b-col>
          <b-input-group>
            <b-form-input v-model="footerBgVariant" placeholder="Enter text"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
