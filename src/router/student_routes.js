import DashboardLayout from "@/views/layout/DashboardLayout";
import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";
import StudentHome from "@/views/students/StudentHome/StudentHome";
import TeacherClasses from "@/views/teachers/TeacherClasses/TeacherClasses";
import TeacherAssignments from "@/views/teachers/TeacherAssignments/TeacherAssignments";
import TeacherSettings from "@/views/teachers/TeacherSettings/TeacherSettings";

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
            path: 'classes',
            // component: StudentClasses,
            name: 'student.classes',
            meta: studentAccessControlMeta,
        },



        /*  ASSIGNMENTS */
        {
            path: 'assignments',
            name: 'student.assignments',
            // component: StudentAssignments,
            meta: studentAccessControlMeta
        },

        /*  SETTINGS */
        {
            path: 'settings',
            name: 'student.settings',
            // component: StudentSettings,
            meta: studentAccessControlMeta
        },
    ]
}
