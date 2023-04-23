<script setup>
import Counter from './Counter.vue'

import axios from 'axios'

const { data: meetings } = await axios.get('http://127.0.0.1:3000/meetings')
</script>

<template>
  <h1>Meetings !!!</h1>
  <ul>
    <li v-for="meeting in meetings" :key="meeting.id">
      {{ meeting.name }} at {{ meeting.location }} on {{ meeting.date }}
    </li>
  </ul>
  <Counter name="Counter" />
  <Counter name="Counter 2" />
</template>
