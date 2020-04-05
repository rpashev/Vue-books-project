import Home from '../src/components/Home.vue'
import Login from '../src/components/auth/Login.vue'
import Register from '../src/components/auth/Register.vue'
import ToReadList from '../src/components/ToReadList.vue'
import AlreadyReadList from '../src/components/AlreadyReadList.vue'
import AddABook from '../src/components/AddABook.vue'
import NotFound from '../src/components/NotFound.vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";
require("firebase/auth");


let router = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login, meta: { requiresGuest: true } },
        { path: '/register', component: Register, meta: { requiresGuest: true } },
        { path: '/to-read', component: ToReadList, meta: { requiresAuth: true } },
        { path: '/already-read', component: AlreadyReadList, meta: { requiresAuth: true } },
        { path: '/add-book', component: AddABook, meta: { requiresAuth: true } },
        {path: '*', component: NotFound}

    ],
    mode: 'history'
});
router.beforeEach((to, from, next)=> {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(!firebase.auth().currentUser){
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next();
        }
    } else if(to.matched.some(record => record.meta.requiresGuest)){
        if(firebase.auth().currentUser){
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router;
