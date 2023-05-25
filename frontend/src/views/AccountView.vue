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
      <a v-if="user" href="http://ali.shahab.pk">
        <img crossorigin="anonymous" :src="'http://localhost:3000' + user.avatarUrl" />
      </a>

      <!-- the username -->
      <h1>Ali Shahab</h1>

      <!-- and role or location -->
      <h2>Another Web Designer</h2>
    </header>
    <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input" />
    <button type="button" @click="updateProfile">Update Profile</button>
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
        <a href="https://twitter.com/alishahab">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-twitter.svg" />
        </a>
      </li>

      <!-- envato – use this one to link to your marketplace profile -->
      <li>
        <a href="http://themeforest.net/user/alishahab">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-envato.svg" />
        </a>
      </li>

      <!-- codepen - your codepen profile-->
      <li>
        <a href="https://codepen.io/alishahab">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-codepen.svg" />
        </a>
      </li>

      <!-- add or remove social profiles as you see fit -->
    </ul>
  </aside>
</template>
