import DashboardLayout from "@/views/layout/DashboardLayout";
import StudentHome from "@/views/students/StudentHome/StudentHome";
import StudentClass from "@/views/students/StudentClass/StudentClass";
import ClassRanking from "@/views/students/StudentClass/Components/ClassRanking";
import ClassTeachers from "@/views/students/StudentClass/Components/ClassTeachers";
import ClassClassmates from "@/views/students/StudentClass/Components/ClassClassmates";
import SchoolRanking from "@/views/students/StudentClass/Components/SchoolRanking";
import Settings from "@/views/Settings";
import AssignmentIndex from "@/views/students/StudentAssignments/Index/Index";
import AssignmentShow from "@/views/students/StudentAssignments/Show/Index";
import StudentDetails from "@/views/students/StudentDetails/StudentDetails";
import StudentBadges from "@/views/students/StudentDetails/components/StudentBadges";
import AssignmentDetails from "@/views/students/StudentAssignments/Show/Components/AssignmentDetails";

const studentAccessControlMeta = {
    checkAuth: 'true',
    checkRole: 'Student'
}

export default {
    path: '/students',
    component: DashboardLayout,
    children: [

        /* HOME */
        {
            path: '',
            component: StudentHome,
            name: 'student.home',
            meta: studentAccessControlMeta,
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
                    path: 'classmates',
                    name: 'student.class.classmates',
                    component: ClassClassmates,
                    meta: studentAccessControlMeta,
                },
                {
                    path: 'teachers',
                    name: 'student.class.teacher',
                    component: ClassTeachers,
                    meta: studentAccessControlMeta,
                },
                {
                    path: 'school-ranking',
                    name: 'student.class.school_ranking',
                    component: SchoolRanking,
                    meta: studentAccessControlMeta,
                },
            ]
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
