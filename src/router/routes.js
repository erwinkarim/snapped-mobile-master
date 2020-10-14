import Home from "@/views/Home";
import Login from "@/views/Login";
import TeacherHome from "@/views/teachers/TeacherHome";

export default [
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
    },
    {
        path: '/',
        name: 'home',
        component: TeacherHome,
        meta: {
            checkAuth: 'true',
            checkRole: 'student'
        }
    }
]
