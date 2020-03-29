import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'


Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// import db from '../src/firebase-config';
// import books from '../books.json'

// books.forEach(book=>{
//   db.collection('books').add({book})
//   .then(book=>console.log(book))
//   .catch(err=>console.log(err))
// })