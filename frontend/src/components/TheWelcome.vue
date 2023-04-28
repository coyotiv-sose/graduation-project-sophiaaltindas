<script setup>
import axios from 'axios'

axios.defaults.withCredentials = true

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const { data: meetings } = await axios.get('/meetings')
</script>

<template>
  <h1>Meetings !!!</h1>
  <ul>
    <li v-for="meeting in meetings" :key="meeting.id">
      {{ meeting.name }} at {{ meeting.location }} on {{ meeting.date }}
    </li>
  </ul>
</template>
