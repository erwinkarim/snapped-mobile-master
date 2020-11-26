import StudentHome from "@/views/students/StudentHome/StudentHome";
import StudentClass from "@/views/students/StudentClass/StudentClass";
import ClassRanking from "@/views/students/StudentClass/Components/ClassRanking";
import ClassTeachers from "@/views/students/StudentClass/Components/ClassTeachers";
import ClassClassmates from "@/views/students/StudentClass/Components/ClassClassmates";
import SchoolRanking from "@/views/students/StudentClass/Components/SchoolRanking";
import Settings from "@/views/Settings";
import AssignmentIndex from "@/views/students/StudentAssignments/Index/Index";
import App from "@/App";
import StudentDetails from "@/views/students/StudentDetails/StudentDetails";
import StudentBadges from "@/views/students/StudentDetails/components/StudentBadges";
import StudentAssignments from "@/views/students/StudentDetails/components/StudentAssignments";
import StudentOverview from "@/views/students/StudentDetails/components/StudentOverview";

const studentAccessControlMeta = {
    checkAuth: 'true',
    checkRole: 'Student'
}

const authControlMeta = {
    checkAuth: 'true'
}

export default {
    path: '/students',
    component: App,
    children: [

        /* HOME */
        {
            path: '',
            component: StudentHome,
            name: 'student.home',
            meta: studentAccessControlMeta,
        },
        {
            path: 'profile/:studentID',
            component: StudentDetails,
            props: true,
            children: [
                {
                    path: 'show',
                    name: 'student.profile.show',
                    component: StudentBadges,
                    meta: authControlMeta,
                    props: true,
                },
                {
                    path: 'assignments',
                    name: 'student.profile.show.assignments',
                    component: StudentAssignments,
                    meta: authControlMeta,
                    props: true
                },
                {
                    path: 'overview',
                    name: 'student.profile.show.overview',
                    component: StudentOverview,
                    meta: authControlMeta,
                    props: true,
                }
            ]
        },

        /*  CLASSES */
        {
            path: 'class',
            component: StudentClass,
            children: [
                {
                    path: 'ranking',
                    name: 'student.class',
                    component: ClassRanking,
                    meta: studentAccessControlMeta,
                },
                {
                    path: 'teachers',
                    name: 'student.class.teacher',
                    component: ClassTeachers,
                    meta: studentAccessControlMeta,
                },
                {
                    path: 'classmates',
                    name: 'student.class.classmates',
                    component: ClassClassmates,
                    meta: studentAccessControlMeta,
                },
            ]
        },
        {
            path: 'school/ranking',
            name: 'student.class.school_ranking',
            component: SchoolRanking,
            meta: studentAccessControlMeta,
        },



        /*  ASSIGNMENTS */
        {
            path: 'assignments',
            name: 'student.assignments',
            component: AssignmentIndex,
            meta: studentAccessControlMeta
        },

        /*  SETTINGS */
        {
            path: 'settings',
            name: 'student.settings',
            component: Settings,
            meta: studentAccessControlMeta
        },
    ]
}
