<template>
  <div class="single-book">
    <div class="card">
      <div class="card-title">
        <p>{{book.title}}</p>
        <p>{{book.author}}</p>
      </div>
      <img :src="book.imageLink" alt />
    </div>
    <div class="buttons">
      <button
        v-if="!isInToRead"
        class="btn-to-read"
        :disabled="!userID"
        @click="addToWishList"
      >WANT TO READ</button>
      <button
        v-if="isInToRead"
        class="btn-to-read removal"
        :disabled="!userID"
        @click="removeToRead"
      >DON'T WANT TO READ</button>
      <button
        v-if="!isInAlreadyRead"
        class="btn-already-read"
        :disabled="!userID"
        @click="markAsRead"
      >ALREADY READ</button>
      <button
        v-if="isInAlreadyRead"
        class="btn-already-read removal"
        :disabled="!userID"
        @click="removeAlreadyRead"
      >MARK AS NOT READ</button>
    </div>
  </div>
</template>

<script>
import db from "../firebase-config";
import firebase from "firebase/app";
import { checkListsMixin } from "../mixins/CheckListsMixin";

export default {
  props: ["book"],
  mixins: [checkListsMixin],
  data() {
    return {
      userID: localStorage.getItem("userID"),
      isInToRead: false,
      isInAlreadyRead: false
    };
  },

  methods: {
    async addToWishList() {
      try {
        await db
          .collection("userData")
          .doc(this.userID)
          .update({
            toRead: firebase.firestore.FieldValue.arrayUnion(this.book.id)
          });
        this.isInToRead = true;
      } catch (err) {
        alert(err);
      }
    },
    async markAsRead() {
      try {
        await db
          .collection("userData")
          .doc(this.userID)
          .update({
            alreadyRead: firebase.firestore.FieldValue.arrayUnion(this.book.id)
          });
        this.isInAlreadyRead = true;
      } catch (err) {
        alert(err);
      }
    },
    async removeToRead() {
      try {
        await db
          .collection("userData")
          .doc(this.userID)
          .update({
            toRead: firebase.firestore.FieldValue.arrayRemove(this.book.id)
          });
        this.isInToRead = false;
        this.$emit("removedId", this.book.id)
      } catch (err) {
        alert(err);
      }
    },

    async removeAlreadyRead() {
      try {
        await db
          .collection("userData")
          .doc(this.userID)
          .update({
            alreadyRead: firebase.firestore.FieldValue.arrayRemove(this.book.id)
          });
        this.isInAlreadyRead = false;
        this.$emit("removedIdEvent", this.book.id)
      } catch (err) {
        alert(err);
      }
    }
  }
};
</script>

<style scoped>
.single-book {
  margin: 3rem;
  box-shadow: 5px 5px #cccaca;
  border-radius: 3%;
}
.single-book:hover {
  transform: scale(1.1);
  transition: 0.5s ease;
}
.card {
  border: 2px solid black;
  position: relative;
  width: 270px;
  height: 420px;
}
.card .card-title p {
  text-align: center;
}
.card img {
  width: 100%;
  height: 80%;
  position: absolute;
  bottom: 0;
}
.buttons {
  position: relative;
}
.buttons button {
  text-align: center;
  font-size: 0.7rem;
  padding: 5px 5px;
  border-radius: 0%;
  background: #385502;
  width: 50%;
  height: 4rem;
  cursor: pointer;
  color: white;
}
.buttons button[disabled] {
  background: gray;
  cursor: default;
}
.buttons .removal {
  background: #690314;
}
</style>
