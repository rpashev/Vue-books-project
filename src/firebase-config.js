import firebase from 'firebase/app'
import 'firebase/firestore'

let config = {
    apiKey: "AIzaSyC3zz2AF6GtjWgvPkdZCQiM5UOuNKqYxT4",
    authDomain: "vue-books-project-9ac54.firebaseapp.com",
    databaseURL: "https://vue-books-project-9ac54.firebaseio.com",
    projectId: "vue-books-project-9ac54",
    storageBucket: "vue-books-project-9ac54.appspot.com",
    messagingSenderId: "875520434839",
    appId: "1:875520434839:web:769a2a1ae58a01113fffd2",
    measurementId: "G-HV2N93ZHF2"
}
firebase.initializeApp(config);
const db = firebase.firestore();



export default db;