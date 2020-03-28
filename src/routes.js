import Home from '../src/components/Home.vue'
import About from '../src/components/shared/About.vue'
import Login from '../src/components/auth/Login.vue'
import Register from '../src/components/auth/Register.vue'

export default [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];