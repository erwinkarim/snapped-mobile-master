import AssignmentShow from "@/views/teachers/TeacherAssignments/Show/Index";
import AssignmentDetails from "@/views/teachers/TeacherAssignments/Show/Components/AssignmentDetails";
import AssignmentCreate from "@/views/teachers/TeacherAssignments/Create/Index";
import AssignmentMark from "@/views/teachers/TeacherAssignments/Mark/Index";
import AssignmentForm from "@/views/teachers/TeacherAssignments/Create/Components/AssignmentForm";
import AssignmentMarkDetails from '@/views/teachers/TeacherAssignments/Mark/Components/AssignmentDetails';
import AssignmentMarkFeedback from '@/views/teachers/TeacherAssignments/Mark/Components/AssignmentFeedback';
import App from "@/App";
import AssignmentAddMark from "@/views/teachers/TeacherAssignments/Mark/Components/AssignmentAddMark";
import EditSnappedAnswer from "@/views/teachers/TeacherAssignments/Mark/Components/EditSnappedAnswer";

const teacherAccessControlMeta = {
    checkAuth: 'true',
    checkRole: 'Teacher'
}

export default {
    path: '/teacher',
    component: App,
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
                },
                {
                    path: 'submission/:submissionID',
                    component: AssignmentMark,
                    props: true,
                    children: [
                        {
                            path: '',
                            name: 'teacher.assignments.marking.details',
                            component: AssignmentMarkDetails,
                            meta: teacherAccessControlMeta,
                            props: true,
                        },
                        {
                            path: 'marking',
                            name: 'teacher.assignments.marking.snapped_answer.edit',
                            component: EditSnappedAnswer,
                            meta: teacherAccessControlMeta,
                            props: true,
                        },
                        {
                            path: 'feedback',
                            name: 'teacher.assignments.marking.feedback',
                            component: AssignmentMarkFeedback,
                            meta: teacherAccessControlMeta,
                            props: true,
                        },
                        {
                            path: 'add-mark',
                            name: 'teacher.assignments.marking.add_mark',
                            component: AssignmentAddMark,
                            meta: teacherAccessControlMeta,
                            props: true,
                        }

                    ]
                }
            ]
        }
    ]
}
