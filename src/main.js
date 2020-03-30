import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import firebase from "firebase/app";
require("firebase/auth");

Vue.config.productionTip = false
Vue.use(VueRouter);
let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      render: h => h(App),
      router
    }).$mount('#app')
  }
})







// import db from '../src/firebase-config';
// import books from '../books.json'

// books.forEach(book=>{
//   db.collection('books').add({book})
//   .then(book=>console.log(book))
//   .catch(err=>console.log(err))
// })