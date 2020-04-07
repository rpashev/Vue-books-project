<template>
  <header>
    <ul>
      <router-link to="/" tag="li" exact>
        <a>Home</a>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login" tag="li" exact>
        <a>Login</a>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/register" tag="li" exact>
        <a>Register</a>
      </router-link>
      <router-link v-if="isLoggedIn" to="/to-read" tag="li" exact>
        <a>Books to read</a>
      </router-link>
      <router-link v-if="isLoggedIn" to="/already-read" tag="li" exact>
        <a>Books I've read</a>
      </router-link>
      <router-link v-if="isLoggedIn" to="/add-book" tag="li" exact>
        <a>Add a Book</a>
      </router-link>
      <router-link v-if="isLoggedIn" to="/logout" tag="li" exact>
        <a @click="logout">Logout</a>
      </router-link>
    </ul>
    <p class="message" v-if="isLoggedIn">Logged in with {{currentUser}}</p>
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
        localStorage.removeItem("user");
        localStorage.removeItem("userID");
      } catch (err) {
        alert(err);
      }

      this.$router.push("/login");
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
      localStorage.setItem("user", this.currentUser);
      localStorage.setItem("userID", firebase.auth().currentUser.uid);
    }
  }
};
</script>

<style scoped>
header {
  position: relative;
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
ul li a {
  text-decoration: none;
  font-size: 1.2rem;
  color: #385502;
}
ul li a:hover {
  background: white
}
.router-link-active {
  text-decoration: underline;
}
.message {
  color: #385502;
  margin: 0;
  position: absolute;
  right: 10%;
  font-size: 1.2rem;
}
</style>