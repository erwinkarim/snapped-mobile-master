import Home from "@/views/Home";
import Login from "@/views/Login";
import TeacherHome from "@/views/teachers/TeacherHome";

export default [
    {
        path: '/',
        name: 'home',
        component: TeacherHome,
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
]
