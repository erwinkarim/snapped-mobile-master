import DashboardLayout from "@/views/layout/DashboardLayout";
import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";
import StudentHome from "@/views/students/StudentHome/StudentHome";
import TeacherClasses from "@/views/teachers/TeacherClasses/TeacherClasses";
import TeacherAssignments from "@/views/teachers/TeacherAssignments/TeacherAssignments";
import TeacherSettings from "@/views/teachers/TeacherSettings/TeacherSettings";
import StudentClass from "@/views/students/StudentClass/StudentClass";
import ClassRanking from "@/views/students/StudentClass/Components/ClassRanking";
import ClassTeachers from "@/views/students/StudentClass/Components/ClassTeachers";
import ClassClassmates from "@/views/students/StudentClass/Components/ClassClassmates";
import SchoolRanking from "@/views/students/StudentClass/Components/SchoolRanking";
import Settings from "@/views/Settings";
import StudentAssignments from "@/views/students/StudentAssignments/StudentAssignments";

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
            component: StudentAssignments,
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
