<template>
  <form @submit.prevent="submitHandler">
    <label for="title">Title</label>
    <input type="text" v-model="title" @blur="$v.title.$touch"/>
    <template v-if="$v.title.$error">
      <p v-if="!$v.title.required" class="error">Title is required!</p>
    </template>
    <label for="author">Author</label>
    <input type="text" v-model="author" @blur="$v.author.$touch"/>
    <template v-if="$v.author.$error">
      <p v-if="!$v.author.required" class="error">Author is required!</p>
    </template>
    <label for="imageLink">Image Link</label>
    <input type="text" v-model="imageLink" @blur="$v.imageLink.$touch" />
    <template v-if="$v.imageLink.$error">
      <p v-if="!$v.imageLink.url" class="error">Image link should be a valid URL!</p>
      <p v-if="!$v.imageLink.required" class="error">Image link is required!</p>
    </template>
    <button>Submit</button>
  </form>
</template>

<script>
import db from "../firebase-config";
import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      title: "",
      author: "",
      imageLink: ""
    };
  },
  methods: {
    submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let book = {
        title: this.title,
        author: this.author,
        imageLink: this.imageLink
      };

      db.collection("books")
        .add({ book })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => alert(err));

      this.title = "";
      this.author = "";
      this.imageLink = "";
    }
  },
  validations: {
    title: {
      required
    },
    author: {
      required
    },
    imageLink: {
      url,
      required
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