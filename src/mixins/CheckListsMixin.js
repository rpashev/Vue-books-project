import db from "../firebase-config";
export const checkListsMixin = {
    
    created() {
        this.checkLists("toRead");
        this.checkLists("alreadyRead");
    },
    methods: {
        checkLists(list) {
            db.collection("userData")
                .doc(this.userID)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        if (doc.data()[list].includes(this.book.id)) {
                            list === "toRead" ? this.isInToRead = true : this.isInAlreadyRead = true;
                        } else {
                            list === "toRead" ? this.isInToRead = false : this.isInAlreadyRead = false;
                        }
                    } else {
                        alert("No such document!");
                    }
                })
                .catch(function (error) {
                    alert("Error getting document:", error);
                });
        }
    },
}


