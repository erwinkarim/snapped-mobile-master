import Login from "@/views/Login";
import teacher_routes from "@/router/teacher_routes";
import student_routes from "@/router/student_routes";
import student_assignment_routes from "@/router/student_assignment_routes";
import teacher_assignment_routes from "@/router/teacher_assignment_routes";
import googleAuthCallback from "@/views/integrations/googleAuthCallback";

export default [
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
    },
    teacher_routes,
    student_routes,
    student_assignment_routes,
    teacher_assignment_routes,

    // INTEGRATIONS
    {
        path: '/auth/google/callback',
        name: 'auth.google.callback',
        component: googleAuthCallback,
        props: true
    }
]
