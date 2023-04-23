<script setup>
import axios from 'axios'

import { RouterLink } from 'vue-router'

import Counter from '../components/Counter.vue'

import CounterOptionsApi from '../components/CounterOptionsApi.vue'

const { data: meetings } = await axios.get('http://localhost:3000/meetings')
</script>

<template lang="pug">
.meetings
  h1 Meetings
  h2 Welcome!

  ul
    li(v-for='meeting in meetings' :key='meeting.id')
      | {{ meeting.name }} at {{ meeting.location }} on {{ meeting.date }}
</template>
