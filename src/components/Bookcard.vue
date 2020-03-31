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
      <button :disabled="!userID" @click="addToWishList">WANT TO READ</button>
      <button :disabled="!userID" @click="markAsRead">ALREADY READ</button>
    </div>
  </div>
</template>

<script>
import db from "../firebase-config";
import firebase from "firebase/app";

export default {
  props: ["book"],
  data() {
    return {
      userID: localStorage.getItem("userID")
    };
  },

  methods: {
    async addToWishList() {
      try {
        await db.collection("userData").doc(this.userID)
        .update({
          toRead: firebase.firestore.FieldValue.arrayUnion(this.book.id)
        });

      } catch(err){
        alert(err)
      }
    },

    async markAsRead() {
       try {
        await db.collection("userData").doc(this.userID)
        .update({
          alreadyRead: firebase.firestore.FieldValue.arrayUnion(this.book.id)
        });

      } catch(err){
        alert(err)
      }
    }
  }
};
</script>

<style scoped>
.single-book {
  margin: 3rem;
  box-shadow: 5px 10px #cccaca;
  border-radius: 3%;
}
.single-book:hover {
  transform: scale(1.1);
  transition: 0.5s ease;
}
.card {
  border: 2px solid black;
  position: relative;
  width: 250px;
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
.buttons button {
  padding: 10px;
  border-radius: 0%;
  background: #385502;
  width: 50%;
  cursor: pointer;
  color: white;
}
.buttons button[disabled] {
  background: gray;
}
</style>
