<template>
  <div class="booklist">
    <app-book-card v-for="book in books" :key="book.id" :book="book"></app-book-card>
    <div v-if="!this.isLoaded">Loading...</div>
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
      bookIDs: [],
      userID: localStorage.getItem("userID")
    };
  },
  created() {
    db.collection("userData")
      .doc(this.userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          doc.data().alreadyRead.forEach(id => this.bookIDs.unshift(id));
        } else {
          alert("No such document!");
        }
      })
      .catch(function(error) {
        alert("Error getting document:", error);
      });

    console.log(this.bookIDs);
    //////////////////getting the books
    db.collection("books")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (this.bookIDs.includes(doc.id)) {
            let book = { ...doc.data().book, id: doc.id };
            this.books.unshift(book);
          }
        });
      })
      .catch(err => console.log(err));
  },

  computed: {
    isLoaded() {
      return !!this.books.length;
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
</style>
