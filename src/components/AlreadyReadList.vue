<template>
  <div class="booklist">
    <app-book-card @removedIdEvent="remove" v-for="book in books" :key="book.id" :book="book"></app-book-card>
    <div class="loader loading" v-if="this.isLoading"></div>
    <div class="loading" v-if="!bookIDs.length && !isLoading">No books in this list yet</div>
  </div>
</template>

<script>
import Card from "./Bookcard";
import { userListsMixin } from "../mixins/UserListsMixin";

export default {
  components: {
    appBookCard: Card
  },
  mixins: [userListsMixin],

  created() {
    this.getBookIDs("alreadyRead")
    this.loadBooks();
  },
  
  methods: {
    remove(data) {
      this.books = this.books.filter(book => book.id !== data);
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
.loading {
  margin: 5rem auto;
  font-size: 2rem;
}
</style>
