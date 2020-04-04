<template>
  <form @submit.prevent="submitHandler">
    <label for="email">email</label>
    <input type="email" v-model="email" @blur="$v.email.$touch" class="error" />
    <template v-if="$v.email.$error">
      <p v-if="!$v.email.required" class="error">Email is required!</p>
      <p v-else-if="!$v.email.email" class="error">Email is invalid!</p>
    </template>
    <label for="password">password</label>
    <input type="password" v-model="password" @blur="$v.password.$touch" class="error" />
    <template v-if="$v.password.$error">
      <p v-if="!$v.password.required" class="error">Password is required!</p>
      <p
        v-else-if="!$v.password.minLength"
        class="error"
      >Password should be at least 6 symbols!</p>
    </template>
    <label for="repeatPassword">repeat password</label>
    <input
      type="re-password"
      v-model="repeatPassword"
      @blur="$v.repeatPassword.$touch"
      class="error"
    />
    <template v-if="$v.repeatPassword.$error">
      <p v-if="!$v.repeatPassword.sameAs" class="error">Repeat Password does not match password!</p>
    </template>
    <button>Submit</button>
  </form>
</template>

<script>
import db from "../../firebase-config";
import firebase from "firebase/app";
require("firebase/auth");
import { validationMixin } from "vuelidate";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  data() {
    return {
      email: "",
      password: "",
      repeatPassword: ""
    };
  },
  methods: {
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let userId = "";
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);

        let user = await firebase.auth().currentUser;
        userId = user.uid;

        let userList = {
          alreadyRead: [],
          toRead: []
        };

        await db
          .collection("userData")
          .doc(userId)
          .set(userList)
          .catch(err => console.log(err));

        this.email = "";
        this.password = "";
        this.repeatPassword = "";
        this.$router.push("/");
      } catch (err) {
        alert(err);
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAs: sameAs("password")
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
p.error {
  text-align: left;
  background-color: #f8d7da;
  padding: 8px;
  border-radius: 3px;
}
</style>