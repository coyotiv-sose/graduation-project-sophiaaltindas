<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useAccountStore } from './stores/account'
import { useSocketStore } from './stores/socket'
import { mapActions, mapState } from 'pinia'

import axios from 'axios'

export default {
  name: 'App',
  components: {
    HelloWorld,
    RouterLink,
    RouterView
  },

  async mounted() {
    await this.fetchUser()
    await this.init()
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout']),
    ...mapActions(useSocketStore, ['init'])
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
    ...mapState(useSocketStore, ['connected', 'time'])
  }
}
</script>

<template>
  <div>
    <!-- <b-navbar fixed>
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="/account">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item href="/mymeetings"> My Meetings</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item v-if="!user" href="/signup">Sign up</b-nav-item>
        <b-nav-item v-if="user" @click="logout" href="/login">Log out</b-nav-item>
      </b-navbar-nav>
    </b-navbar> -->

    <div>
      <b-navbar type="dark" variant="white">
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="/account">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-item href="/mymeetings"> My Meetings</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-if="!user" href="/signup">Sign up</b-nav-item>
          <b-nav-item v-if="user" @click="logout" href="/login">Log out</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink v-if="!user" to="/signup">Sign up</RouterLink>
        <RouterLink v-if="user" @click="logout" to="/login">Log out</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- Socket connected: {{ connected ? 'yes' : 'no' }}  -->

  <h1>Letsgo for {{ user?.name }}</h1>
  <p>{{ time }}</p>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

/* nav a.router-link-exact-active {
  color: var(--color-text);
} */

/* nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
