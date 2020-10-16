import Login from "@/views/Login";
import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";

export default [
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: TeacherHome,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        }
    }
]
