import Login from "@/views/Login";
import teacher_routes from "@/router/teacher_routes";
import student_routes from "@/router/student_routes";

export default [
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
    },
    teacher_routes,
    student_routes
]
