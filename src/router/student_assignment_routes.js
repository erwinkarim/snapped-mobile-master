import AssignmentShow from "@/views/students/StudentAssignments/Show/Index";
import AssignmentDetails from "@/views/students/StudentAssignments/Show/Components/AssignmentDetails";
import AlternateDashboardLayout from "@/views/layout/AlternateDashboardLayout";
import AnswerIndex from "@/views/students/StudentAssignments/Answer/Index";
import AnswerWrite from "@/views/students/StudentAssignments/Answer/AnswerWrite";
import AnswerSave from "@/views/students/StudentAssignments/Answer/AnswerSave";

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
                },
                {
                    path: 'answer',
                    component: AnswerIndex,
                    children: [
                        {
                            path: 'write',
                            name: 'student.assignments.answer.write',
                            component: AnswerWrite,
                            meta: studentAccessControlMeta,
                            props: true
                        },
                        {
                            path: 'save',
                            name: 'student.assignments.answer.save',
                            component: AnswerSave,
                            meta: studentAccessControlMeta,
                            props: true
                        },

                    ]
                },
            ]
        }
    ]
}
