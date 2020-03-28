import Home from '../src/components/Home.vue'
import About from '../src/components/shared/About.vue'
import Login from '../src/components/auth/Login.vue'
import Register from '../src/components/auth/Register.vue'
import ToReadList from '../src/components/ToReadList.vue'
import AlreadyReadList from '../src/components/AlreadyReadList.vue'

export default [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/toread', component: ToReadList},
    { path: '/alreadyread', component: AlreadyReadList},

];