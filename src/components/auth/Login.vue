<template>
  <form @submit.prevent="submitHandler">
    <label for="email">email</label>
    <input type="email" v-model="email" @blur="$v.email.$touch" class="error" />
    <template v-if="$v.email.$error">
      <p v-if="!$v.email.required" class="error">Email is required!</p>
      <p v-else-if="!$v.email.email" class="error">Email is invalid!</p>
    </template>
    <label for="password">password</label>
    <input type="password" v-model="password" class="error" @blur="$v.password.$touch"/>
    <template v-if="$v.password.$error">
      <p v-if="!$v.password.required" class="error">Password is required!</p>
       <p
        v-else-if="!$v.password.minLength"
        class="error"
      >Password should be at least 6 symbols!</p>
    </template>
    <button>Submit</button>
  </form>
</template>

<script>
import firebase from "firebase/app";
require("firebase/auth");
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);

        this.$router.push("/");
      } catch (err) {
        alert(err);
      }

      this.email = "";
      this.password = "";
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
    }
  }
};
</script>

<style scoped>
form {
  margin: 0 auto;
  width: 800px;
}

form input,
label {
  display: block;
}
input {
  margin: 0.5rem 0;
  width: 250px;
}
p.error {
  width: 240px;
  text-align: left;
  background-color: #f8d7da;
  padding: 8px;
  border-radius: 3px;
}

</style>