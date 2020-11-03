import AssignmentShow from "@/views/students/StudentAssignments/Show/Index";
import AssignmentDetails from "@/views/students/StudentAssignments/Show/Components/AssignmentDetails";
import AlternateDashboardLayout from "@/views/layout/AlternateDashboardLayout";

const studentAccessControlMeta = {
    checkAuth: 'true',
    checkRole: 'Student'
}

export default {
    path: '/students',
    component: AlternateDashboardLayout,
    children: [
        {
            path: 'assignments/:assignmentID',
            component: AssignmentShow,
            children: [
                {
                    path: 'show',
                    name: 'student.assignments.show',
                    component: AssignmentDetails,
                    meta: studentAccessControlMeta,
                    props: true,
                }
            ]
        }
    ]
}
