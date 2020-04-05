<template>
  <div>
    <input @input="search" class="search" placeholder="Search" v-model="searchQuery" />
    <div v-if="!searchQuery" class="booklist">
      <app-book-card v-for="book in books" :key="book.id" :book="book"></app-book-card>
      <div v-if="this.isLoading">Loading...</div>
    </div>
    <div v-if="searchQuery" class="booklist">
      <app-book-card v-for="book in filteredBooks" :key="book.id" :book="book"></app-book-card>
    </div>
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
      filteredBooks: [],
      isLoading: false,
      searchQuery: ""
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
  methods: {
    search() {
      this.filteredBooks = this.books.filter(book => {
        if (
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
        ) {
          return book;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.booklist {
  display: flex;
  flex-wrap: wrap;
}
.search {
  margin-left: 3rem;
}
</style>
