<template>
  <form @submit.prevent="submitHandler">
    <label for="email">email</label>
    <input type="email" v-model="email" />
    <label for="password">password</label>
    <input type="password" v-model="password" />
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submitHandler() {
      console.log(this.email);
      console.log(this.password);
      this.email = '';
      this.password = '';
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