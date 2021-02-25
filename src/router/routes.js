import Login from "@/views/Login";
import teacher_routes from "@/router/teacher_routes";
import student_routes from "@/router/student_routes";
import student_assignment_routes from "@/router/student_assignment_routes";
import teacher_assignment_routes from "@/router/teacher_assignment_routes";

export default [
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
    },
    {
        path: '/auth/:provider/callback',
        component: {
            template: '<div class="auth-component"></div>'

        },
    },
    teacher_routes,
    student_routes,
    student_assignment_routes,
    teacher_assignment_routes
]
