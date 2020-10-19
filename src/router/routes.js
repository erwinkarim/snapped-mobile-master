import Login from "@/views/Login";
import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";
import TeacherClasses from "@/views/teachers/TeacherClasses/TeacherClasses";
import TeacherClassDetails from "@/views/teachers/TeacherClasses/TeacherClassDetails";

export default [
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
    },
    {
        path: '/teacher',
        name: 'teacher.home',
        component: TeacherHome,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        }
    },
    {
        path: '/teacher/classes',
        name: 'teacher.classes',
        component: TeacherClasses,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        },
    },
    {
        path: '/teacher/classes/:classID/details',
        name: 'teacher.classes.details',
        component: TeacherClassDetails,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        },
    },

]
