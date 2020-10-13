import Home from "@/views/Home";
import Login from "@/views/Login";

export default [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        props: true,
        component: Login,
        meta: {
            authRequired: 'false'
        }
    }
]
