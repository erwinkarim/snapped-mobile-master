import DashboardLayout from "@/views/layout/DashboardLayout";
import TeacherHome from "@/views/teachers/TeacherHome/TeacherHome";
import StudentHome from "@/views/students/StudentHome/StudentHome";

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
        }
    ]
}
