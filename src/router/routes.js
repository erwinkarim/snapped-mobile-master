import Login from "@/views/Login";
import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";
import TeacherClasses from "@/views/teachers/TeacherClasses/TeacherClasses";
import TeacherClassDetails from "@/views/teachers/TeacherClasses/TeacherClassDetails";
import TeacherStudents from "@/views/teachers/TeachersStudents/TeacherStudents";
import TeacherAssignments from "@/views/teachers/TeacherAssignments/TeacherAssignments";
import TeacherSettings from "@/views/teachers/TeacherSettings/TeacherSettings";
import StudentDetails from "@/views/students/StudentDetails/StudentDetails";
import StudentBadges from "@/views/students/StudentDetails/components/StudentBadges";
import StudentAssignments from "@/views/students/StudentDetails/components/StudentAssignments";
import StudentOverview from "@/views/students/StudentDetails/components/StudentOverview";

export default [
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
    },

    /* TEACHER: HOME */
    {
        path: '/teacher',
        name: 'teacher.home',
        component: TeacherHome,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        }
    },

    /* TEACHER: CLASS */
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

    /* TEACHER: STUDENTS */
    {
        path: '/teacher/students',
        name: 'teacher.students',
        component: TeacherStudents,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        },
    },
    {
        path: '/teacher/students/:studentID',
        component: StudentDetails,
        children: [
            {
                path: 'show',
                name: 'teacher.students.show',
                component: StudentBadges,
                meta: {
                    checkAuth: 'true',
                    checkRole: 'Teacher'
                },
                props: true,
            },
            {
                path: 'assignments',
                name: 'teacher.students.show.assignments',
                component: StudentAssignments,
                meta: {
                    checkAuth: 'true',
                    checkRole: 'Teacher'
                },
                props: true
            },
            {
                path: 'overview',
                name: 'teacher.students.show.overview',
                component: StudentOverview,
                props: true,
                meta: {
                    checkAuth: 'true',
                    checkRole: 'Teacher'
                },
            }
        ]
    },

    /* TEACHER: ASSIGNMENTS */
    {
        path: '/teacher/assignments',
        name: 'teacher.assignments',
        component: TeacherAssignments,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        },
    },

    /* TEACHER: SETTINGS */
    {
        path: '/teacher/settings',
        name: 'teacher.settings',
        component: TeacherSettings,
        meta: {
            checkAuth: 'true',
            checkRole: 'Teacher'
        },
    },
]
