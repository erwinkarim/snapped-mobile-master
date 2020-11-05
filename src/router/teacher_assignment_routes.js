import AssignmentShow from "@/views/teachers/TeacherAssignments/Show/Index";
import AssignmentDetails from "@/views/teachers/TeacherAssignments/Show/Components/AssignmentDetails";
import AlternateDashboardLayout from "@/views/layout/AlternateDashboardLayout";
import AssignmentCreate from "@/views/teachers/TeacherAssignments/Create/Index";
import AssignmentForm from "@/views/teachers/TeacherAssignments/Create/Components/AssignmentForm";

const teacherAccessControlMeta = {
    checkAuth: 'true',
    checkRole: 'Teacher'
}

export default {
    path: '/teacher',
    component: AlternateDashboardLayout,
    children: [
        {
            path: 'assignments/create',
            component: AssignmentCreate,
            children: [
                {
                    path: '',
                    name: 'teacher.assignments.create',
                    component: AssignmentForm,
                    meta: teacherAccessControlMeta,
                    props: true,
                }
            ]
        },
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
