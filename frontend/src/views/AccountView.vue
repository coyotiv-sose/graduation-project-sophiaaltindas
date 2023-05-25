<script>
import axios from 'axios'
import { mapState, mapActions } from 'pinia'
import { useAccountStore } from '../stores/account'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'AccountView',
  data() {
    return {
      avatar: null
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    async uploadImage(event) {
      this.avatar = event.target.files[0]
    },
    async updateProfile() {
      const formData = new FormData()
      formData.append('avatar', this.avatar)
      await axios.post('/users/profile', formData)
    }
  }
}
</script>

<template>
  <aside class="profile-card">
    <header>
      <!-- here’s the avatar -->
      <a v-if="user">
        <img
          crossorigin="anonymous"
          width="300"
          height="300"
          :src="'http://localhost:3000' + user.avatarUrl"
        />
      </a>

      <!-- the username -->
      <h1>{{ user.name }}</h1>

      <!-- and role or location -->
      <h2>Another Traveler</h2>
    </header>
    <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input" />
    <b-button type="button" @click="updateProfile">Update Profile</b-button>
    <!-- bit of a bio; who are you? -->
    <div class="profile-bio">
      <p>
        Specialties are Creative UI, HTML5, CSS3, Semantic Web, Responsive Layouts, Web Standards
        Compliance, Performance Optimization, Cross Device Troubleshooting.
      </p>
    </div>

    <!-- some social links to show off -->
    <ul class="profile-social-links">
      <!-- twitter - el clásico  -->
      <li>
        <a>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-twitter.svg"
            width="100"
            height="100"
          />
        </a>
      </li>

      <li>
        <a>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            width="100"
            height="100"
          />
        </a>
      </li>

      <!-- add or remove social profiles as you see fit -->
    </ul>
  </aside>
</template>
