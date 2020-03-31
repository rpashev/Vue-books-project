import db from "../firebase-config";
export const checkListsMixin = {
    created() {
        db.collection("userData")
            .doc(this.userID)
            .get()
            .then(doc => {
                if (doc.exists) {
                    if (doc.data().toRead.includes(this.book.id)) {
                        this.isInToRead = true;
                    } else {
                        this.isInToRead = false;
                    }
                } else {
                    alert("No such document!");
                }
            })
            .catch(function (error) {
                alert("Error getting document:", error);
            });
        db.collection("userData")
            .doc(this.userID)
            .get()
            .then(doc => {
                if (doc.exists) {
                    if (doc.data().alreadyRead.includes(this.book.id)) {
                        this.isInAlreadyRead = true;
                    } else {
                        this.isInAlreadyRead = false;
                    }
                } else {
                    alert("No such document!");
                }
            })
            .catch(function (error) {
                alert("Error getting document:", error);
            });
    }
}


