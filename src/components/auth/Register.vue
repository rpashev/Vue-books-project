<template>
  <form @submit.prevent="submitHandler">
    <label for="email">email</label>
    <input type="email" v-model="email" />
    <label for="username">username</label>
    <input type="text" v-model="username" />
    <label for="password">password</label>
    <input type="password" v-model="password" />
    <label for="repeatPassword">repeatPassword</label>
    <input type="repeatPassword" v-model="repeatPassword" />
    <button>Submit</button>
  </form>
</template>

<script>
import db from "../../firebase-config";
import firebase from "firebase/app";
require("firebase/auth");

export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      repeatPassword: ""
    };
  },
  methods: {
    async submitHandler() {
      let userId = "";
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);

        let user = await firebase.auth().currentUser;
        userId = user.uid;

        let userList = {
          user: userId,
          lists: {
            alreadyRead: [],
            toRead: []
          }
        };

        db.collection("user-lists")
          .add(userList)
          .catch(err => console.log(err));

        this.email = "";
        this.password = "";
        this.repeatPassword = "";
        this.username = "";
        
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 0 auto;
  width: 600px;
}

form input,
label {
  display: block;
}
input {
  margin: 0.5rem 0;
}
</style>