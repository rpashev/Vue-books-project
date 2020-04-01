<template>
  <div class="booklist">
    <app-book-card  v-for="book in books" :key="book.id" :book="book"></app-book-card>
    <div v-if="this.isLoading">Loading...</div>
  </div>
</template>

<script>
import Card from "./Bookcard";
import db from "../firebase-config";
export default {
  components: {
    appBookCard: Card
  },
  data() {
    return {
      books: [],
      isLoading: false,
     
    };
  },
  created() {
    this.isLoading = true;
    db.collection("books")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          let book = { ...doc.data().book, id: doc.id };
          this.books.unshift(book);
        });
        this.isLoading = false;
      })
      .catch(err => alert(err));
    
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.booklist {
  display: flex;
  flex-wrap: wrap;
}
</style>
