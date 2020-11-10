import AssignmentShow from "@/views/students/StudentAssignments/Show/Index";
import AnswerIndex from "@/views/students/StudentAssignments/Answer/Index";
import AnswerWrite from "@/views/students/StudentAssignments/Answer/AnswerWrite";
import AnswerSave from "@/views/students/StudentAssignments/Answer/AnswerSave";
import App from "@/App";

const studentAccessControlMeta = {
    checkAuth: 'true',
    checkRole: 'Student'
}

export default {
    path: '/students',
    component: App,
    children: [
        {
            path: 'assignments/:assignmentID',
            component: App,
            children: [
                {
                    path: 'show',
                    name: 'student.assignments.show',
                    component: AssignmentShow,
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
                            name: 'student.assignments.answer.store',
                            component: AnswerSave,
                            meta: studentAccessControlMeta,
                            props: true
                        },

                    ]
                },
                {
                    path: 'answer/:submissionID',
                    component: AnswerIndex,
                    children: [
                        {
                            path: 'edit',
                            name: 'student.assignments.answer.edit',
                            component: AnswerWrite,
                            meta: studentAccessControlMeta,
                            props: true
                        },
                        {
                            path: 'update',
                            name: 'student.assignments.answer.update',
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
