import db from "../firebase-config";
export const userListsMixin = {

    data() {
        return {
            books: [],
            bookIDs: [],
            userID: localStorage.getItem("userID"),
            isLoading: false,

        };
    },

    methods: {
        getBookIDs(list) {
            this.isLoading = true;
            db.collection("userData")
                .doc(this.userID)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        doc.data()[list].forEach(id => this.bookIDs.unshift(id));
                        this.isLoading = false;
                    } else {
                        alert("No such document!");
                    }
                })
                .catch(function (error) {
                    alert("Error getting document:", error);
                });
        },
        loadBooks() {
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
                .catch(err => alert(err));

        },


    },

}