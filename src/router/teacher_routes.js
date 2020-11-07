import DashboardLayout from "@/views/layout/DashboardLayout";
import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";
import TeacherClasses from "@/views/teachers/TeacherClasses/TeacherClasses";
import TeacherClassDetails from "@/views/teachers/TeacherClasses/TeacherClassDetails";
import TeacherStudents from "@/views/teachers/TeachersStudents/TeacherStudents";
import StudentDetails from "@/views/students/StudentDetails/StudentDetails";
import StudentBadges from "@/views/students/StudentDetails/components/StudentBadges";
import StudentAssignments from "@/views/students/StudentDetails/components/StudentAssignments";
import StudentOverview from "@/views/students/StudentDetails/components/StudentOverview";
import TeacherAssignments from "@/views/teachers/TeacherAssignments/Index/TeacherAssignments";
import TeacherSettings from "@/views/teachers/TeacherSettings/TeacherSettings";
import App from "@/App";

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
        {
            path: 'student/:studentID',
            component: StudentDetails,
            children: [
                {
                    path: 'show',
                    name: 'teacher.student.show',
                    component: StudentBadges,
                    meta: {
                        checkAuth: 'true',
                        checkRole: 'Teacher'
                    },
                    props: true,
                },
                {
                    path: 'assignments',
                    name: 'teacher.student.show.assignments',
                    component: StudentAssignments,
                    meta: {
                        checkAuth: 'true',
                        checkRole: 'Teacher'
                    },
                    props: true
                },
                {
                    path: 'overview',
                    name: 'teacher.student.show.overview',
                    component: StudentOverview,
                    props: true,
                    meta: {
                        checkAuth: 'true',
                        checkRole: 'Teacher'
                    },
                }
            ]
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
