import Home from "@/views/Home";
import Login from "@/views/Login";
import TeacherHome from "@/views/teachers/TeacherHome";

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            authRequired: 'true'
        }
    },
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
    },
    {
        path: '/teachers',
        name: 'teacher.home',
        component: TeacherHome,
        meta: {
            authRequired: 'true'
        }
    }
]
