const TeacherHome = () => import("@/views/teachers/TeacherHome/TeacherHome.vue");
const TeacherClasses = () => import("@/views/teachers/TeacherClasses/TeacherClasses.vue");
const TeacherClassDetails = () => import("@/views/teachers/TeacherClasses/TeacherClassDetails.vue");
const TeacherStudents = () => import("@/views/teachers/TeachersStudents/TeacherStudents.vue");
const TeacherAssignments = () => import("@/views/teachers/TeacherAssignments/Index/TeacherAssignments.vue");
const TeacherSettings = () => import("@/views/teachers/TeacherSettings/TeacherSettings.vue");
const App = () => import("@/App.vue");

import DashboardLayout from "@/views/layout/DashboardLayout";
// import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";
// import TeacherClasses from "@/views/teachers/TeacherClasses/TeacherClasses";
// import TeacherClassDetails from "@/views/teachers/TeacherClasses/TeacherClassDetails";
// import TeacherStudents from "@/views/teachers/TeachersStudents/TeacherStudents";
// import StudentDetails from "@/views/students/StudentDetails/StudentDetails";
// import StudentBadges from "@/views/students/StudentDetails/components/StudentBadges";
// import StudentAssignments from "@/views/students/StudentDetails/components/StudentAssignments";
// import StudentOverview from "@/views/students/StudentDetails/components/StudentOverview";
// import TeacherAssignments from "@/views/teachers/TeacherAssignments/Index/TeacherAssignments";
// import TeacherSettings from "@/views/teachers/TeacherSettings/TeacherSettings";
// import App from "@/App";

export default  {

    path: '/teacher',
    component: App,
    children: [

        /* HOME */
        {
            path: '',
            component: TeacherHome,
            name: 'teacher.home',
            meta: {
                checkAuth: 'true',
                checkRole: 'Teacher'
            },
        },

        /*  CLASSES */
        {
            path: 'classes',
            component: TeacherClasses,
            name: 'teacher.classes',
            meta: {
                checkAuth: 'true',
                checkRole: 'Teacher'
            },
        },
        {
            path: 'class/:classID/details',
            name: 'teacher.class.details',
            component: TeacherClassDetails,
            props: true,
            meta: {
                checkAuth: 'true',
                checkRole: 'Teacher'
            },
        },

        /*  STUDENTS */
        {
            path: 'students',
            name: 'teacher.students',
            component: TeacherStudents,
            meta: {
                checkAuth: 'true',
                checkRole: 'Teacher'
            },
        },

        /*  ASSIGNMENTS */
        {
            path: 'assignments',
            name: 'teacher.assignments',
            component: TeacherAssignments,
            meta: {
                checkAuth: 'true',
                checkRole: 'Teacher'
            },
        },

        /*  SETTINGS */
        {
            path: 'settings',
            name: 'teacher.settings',
            component: TeacherSettings,
            meta: {
                checkAuth: 'true',
                checkRole: 'Teacher'
            },
        },

    ]
};
