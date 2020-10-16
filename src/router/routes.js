import Login from "@/views/Login";
import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";
import TeacherClasses from "@/views/teachers/TeacherClasses/TeacherClasses";
import TeacherClassSubjectPage from "@/views/teachers/TeacherClasses/TeacherClassSubjectPage";

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
        path: '/teacher/classes/:classID/subjects',
        name: 'teacher.classes.subjects',
        component: TeacherClassSubjectPage,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        },
    },

]
