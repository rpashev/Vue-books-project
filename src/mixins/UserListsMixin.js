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
                
        }
    },
   
}