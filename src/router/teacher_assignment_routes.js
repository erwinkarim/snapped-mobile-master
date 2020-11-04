import AssignmentShow from "@/views/teachers/TeacherAssignments/Show/Index";
import AssignmentDetails from "@/views/teachers/TeacherAssignments/Show/Components/AssignmentDetails";
import AlternateDashboardLayout from "@/views/layout/AlternateDashboardLayout";

const teacherAccessControlMeta = {
    checkAuth: 'true',
    checkRole: 'Teacher'
}

export default {
    path: '/teacher',
    component: AlternateDashboardLayout,
    children: [
        {
            path: 'assignments/:assignmentID',
            component: AssignmentShow,
            children: [
                {
                    path: 'show',
                    name: 'teacher.assignments.show',
                    component: AssignmentDetails,
                    meta: teacherAccessControlMeta,
                    props: true,
                }
            ]
        }
    ]
}