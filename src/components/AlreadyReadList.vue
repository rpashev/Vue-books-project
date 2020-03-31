<template>
  <div class="booklist">
    <app-book-card v-for="book in books" :key="book.id" :book="book"></app-book-card>
    <div v-if="this.isLoading">Loading...</div>
    <!-- <div v-if="this.isLoaded">No books yet!</div> -->
  </div>
</template>

<script>
import Card from "./Bookcard";
import db from "../firebase-config";
import { userListsMixin }   from "../mixins/UserListsMixin";

export default {
  components: {
    appBookCard: Card
  },
  mixins: [userListsMixin],

  created() {
    this.isLoading = true;
    db.collection("userData")
      .doc(this.userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          doc.data().alreadyRead.forEach(id => this.bookIDs.unshift(id));
          this.isLoading = false;
        } else {
          alert("No such document!");
        }
      })
      .catch(function(error) {
        alert("Error getting document:", error);
      });

    this.loadBooks();
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.booklist {
  display: flex;
  flex-wrap: wrap;
}
</style>
