<template>
  <form @submit.prevent="submitHandler">
    <label for="email">Email</label>
    <input type="email" v-model="email" @blur="$v.email.$touch" class="error" />
    <template v-if="$v.email.$error">
      <p v-if="!$v.email.required" class="error">Email is required!</p>
      <p v-else-if="!$v.email.email" class="error">Email is invalid!</p>
    </template>
    <label for="password">Password</label>
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
  margin: 2rem auto;
  width: 400px;
  font: bold #385502;
}

form input,
label {
  display: block;
  
}
input {
  margin: 0.5rem 0;
  width: 180px;
  padding: 4px;
  border: 2px solid #a2da3c
}
p.error {
  width: 180px;
  text-align: left;
  background-color: #f8d7da;
  padding: 8px;
  border-radius: 3px;
}
button {
  text-align: center;
  font-size: 1rem;
  padding: 4px;
  border-radius: 10%;
  background: #385502;
  width: 20%;
  height: 2rem;
  cursor: pointer;
  color: white;
}

</style>