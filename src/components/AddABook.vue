<template>
  <form @submit.prevent="submitHandler">
    <label for="title">Title</label>
    <input type="text" v-model="title" />
    <label for="author">Author</label>
    <input type="text" v-model="author" />
    <label for="imageLink">Image Link</label>
    <input type="text" v-model="imageLink" />
    <button>Submit</button>
  </form>
</template>

<script>


import db from "../firebase-config";

export default {
  data() {
    return {
      title: "",
      author: "",
      imageLink: ""
    };
  },
  methods: {
    submitHandler() {
      let book = {
        title: this.title,
        author: this.author,
        imageLink: this.imageLink
      };

      db.collection("books")
        .add({ book })
        .then(() => {
            this.$router.push('/')
        })
        .catch(err => alert(err));

      this.title = "";
      this.author = "";
      this.imageLink = "";
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