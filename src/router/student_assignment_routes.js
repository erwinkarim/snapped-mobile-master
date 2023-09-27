// import { component } from "vue/types/umd";

const AssignmentShow = () => import("@/views/students/StudentAssignments/Show/Index.vue");
const AnswerIndex = () => import("@/views/students/StudentAssignments/Answer/Index.vue");
const AnswerWrite = () => import("@/views/students/StudentAssignments/Answer/AnswerWrite.vue");
const AnswerSave = () => import("@/views/students/StudentAssignments/Answer/AnswerSave.vue");
const App = () => import("@/App.vue");
const AnswerEdit = () => import("@/views/students/StudentAssignments/Answer/AnswerEdit.vue");
const MarkedShow = () => import("@/views/students/StudentAssignments/Marked/Index.vue");
const IndividualAnalytics = () => import("@/views/analytics/Individual.vue");
/*
import AssignmentShow from "@/views/students/StudentAssignments/Show/Index";
import AnswerIndex from "@/views/students/StudentAssignments/Answer/Index";
import AnswerWrite from "@/views/students/StudentAssignments/Answer/AnswerWrite";
import AnswerSave from "@/views/students/StudentAssignments/Answer/AnswerSave";
import App from "@/App";
import AnswerEdit from "@/views/students/StudentAssignments/Answer/AnswerEdit";
import MarkedShow from "@/views/students/StudentAssignments/Marked/Index";
*/

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
                    props: true,
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
                    path: 'marked/:marksID',
                    name: 'student.marked.show',
                    component: MarkedShow,
                    meta: studentAccessControlMeta,
                    props: true,
                },
                {
                    path: 'marked/:marksID/analytics', 
                    name: 'student.marked.analytics',
                    component:  IndividualAnalytics,
                    meta: studentAccessControlMeta,
                    props: true,
                },
                {
                    path: 'answer/:submissionID',
                    component: AnswerIndex,
                    children: [
                        {
                            path: 'edit',
                            name: 'student.assignments.answer.edit',
                            component: AnswerEdit,
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
