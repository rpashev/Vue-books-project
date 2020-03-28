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
    submitHandler() {
      console.log(this.email);
      console.log(this.username);
      console.log(this.password);
      console.log(this.repeatPassword);
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.username = "";
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
</style>