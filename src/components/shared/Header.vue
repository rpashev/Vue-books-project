<template>
  <header >
    <ul >
      <router-link to="/" tag="li" exact>
        <a>Home</a>
      </router-link>
      <router-link to="/about" tag="li" exact>
        <a>About</a>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login" tag="li" exact>
        <a >Login</a>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/register" tag="li" exact>
        <a >Register</a>
      </router-link>
      <router-link v-if="isLoggedIn" to="/toread" tag="li" exact>
        <a >Books to read</a>
      </router-link>
      <router-link v-if="isLoggedIn" to="/alreadyread" tag="li" exact>
        <a >Books I've read</a>
      </router-link>
      <router-link v-if="isLoggedIn" to="/logout" tag="li" exact>
        <a  @click="logout">Logout</a>
      </router-link>
    </ul>
    <p v-if="isLoggedIn">You are logged in with {{currentUser}}</p>
  </header>
</template>

<script>
import firebase from "firebase/app";
require("firebase/auth");

export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        console.log(err);
      }

      this.$router.push("/login");
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
}
ul {
  display: flex;
}
ul li {
  list-style: none;
  margin: 2rem;
  cursor: pointer;
}
</style>