<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import { useCounterStore } from '../stores/counter'

defineProps({
  name: {
    type: String,
    required: true
  }
})
const store = useCounterStore()
</script>

<template lang="pug">
div
  h1 {{ name }}
  p Count: {{ store.count }}
  button(@click='store.increment') Increment
  button(@click='store.decrement') Decrement
</template>
