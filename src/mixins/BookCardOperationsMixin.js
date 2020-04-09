import db from "../firebase-config";
import firebase from "firebase/app";
export const bookCardOperationsMixin = {
    
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
              this.$emit("removedId", this.book.id);
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
              this.$emit("removedIdEvent", this.book.id);
            } catch (err) {
              alert(err);
            }
          }
    }
}


