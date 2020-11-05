import AssignmentShow from "@/views/teachers/TeacherAssignments/Show/Index";
import AssignmentDetails from "@/views/teachers/TeacherAssignments/Show/Components/AssignmentDetails";
import AlternateDashboardLayout from "@/views/layout/AlternateDashboardLayout";
import AssignmentCreate from "@/views/teachers/TeacherAssignments/Create/Index";
import AssignmentForm from "@/views/teachers/TeacherAssignments/Create/Components/AssignmentForm";
import QuestionForm from "@/views/teachers/TeacherAssignments/Create/Components/QuestionForm";
import QuestionManualDesc from "@/views/teachers/TeacherAssignments/Create/Components/QuestionManualDesc";

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
                },
                {
                    path: 'question',
                    name: 'teacher.assignments.question',
                    component: QuestionForm,
                    meta: teacherAccessControlMeta,
                    props: true,
                },
                {
                    path: 'question/description',
                    name: 'teacher.assignments.manual-description',
                    component: QuestionManualDesc,
                    meta: teacherAccessControlMeta,
                    props: true,
                }
            ]
        },
        {
            path: 'assignments/create/question',
            component: QuestionForm,
            children: [
                {
                    path: 'show',
                    name: 'teacher.assignments.show',
                    component: AssignmentDetails,
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
        },
    ]
}
