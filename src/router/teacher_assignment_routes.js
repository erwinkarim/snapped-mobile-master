import App from "@/App";
const AssignmentDetails = () => import("@/views/teachers/TeacherAssignments/Index.vue");
const AssignmentShow = () => import("@/views/teachers/TeacherAssignments/Show/Index.vue");
const AssignmentCreate = () => import("@/views/teachers/TeacherAssignments/Create/Index.vue");
const AssignmentMark = () => import("@/views/teachers/TeacherAssignments/Mark/Index.vue");
const AssignmentMarkDetails = () => import('@/views/teachers/TeacherAssignments/Mark/Components/AssignmentDetails.vue');
const AssignmentMarkFeedback = () => import('@/views/teachers/TeacherAssignments/Mark/Components/AssignmentFeedback.vue');
const AssignmentAddMark = () => import("@/views/teachers/TeacherAssignments/Mark/Components/AssignmentAddMark.vue");
const EditSnappedAnswer = () =>  import("@/views/teachers/TeacherAssignments/Mark/Components/EditSnappedAnswer.vue");
const AssignmentEdit = () =>  import("@/views/teachers/TeacherAssignments/Edit/Index.vue");
const AssignmentExport = () =>  import("@/views/teachers/TeacherAssignments/Export/Index.vue");
const GroupAnalytics = () => import("@/views/analytics/Group.vue");
const IndividualAnalytics = () => import("@/views/analytics/Individual.vue");
// import AssignmentDetails from "@/views/teachers/TeacherAssignments/Index"
// import AssignmentShow from "@/views/teachers/TeacherAssignments/Show/Index";
// import AssignmentCreate from "@/views/teachers/TeacherAssignments/Create/Index";
// import AssignmentMark from "@/views/teachers/TeacherAssignments/Mark/Index";
// import AssignmentMarkDetails from '@/views/teachers/TeacherAssignments/Mark/Components/AssignmentDetails';
// import AssignmentMarkFeedback from '@/views/teachers/TeacherAssignments/Mark/Components/AssignmentFeedback';
// import AssignmentAddMark from "@/views/teachers/TeacherAssignments/Mark/Components/AssignmentAddMark";
// import EditSnappedAnswer from "@/views/teachers/TeacherAssignments/Mark/Components/EditSnappedAnswer";
// import AssignmentEdit from "@/views/teachers/TeacherAssignments/Edit/Index";
// import AssignmentExport from "@/views/teachers/TeacherAssignments/Export/Index";

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
            name: 'teacher.assignments.create',
            component: AssignmentCreate,
            meta: teacherAccessControlMeta,
            props: true
        },
        {
            path: 'assignments/:assignmentID',
            component: AssignmentDetails,
            children: [
                {
                    path: 'show',
                    name: 'teacher.assignments.show',
                    component: AssignmentShow,
                    meta: teacherAccessControlMeta,
                    props: true,
                },
                {
                    path: 'edit',
                    name: 'teacher.assignments.edit',
                    component: AssignmentEdit,
                    meta: teacherAccessControlMeta,
                    props: true,
                },
                {
                    path: 'export',
                    name: 'teacher.assignments.export',
                    component: AssignmentExport,
                    meta: teacherAccessControlMeta,
                    props: true,
                },
                {
                    path: 'analytics',
                    name: 'teacher.assignments.group_analytics',
                    component: GroupAnalytics,
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
                            path: 'analytics',
                            name: 'teacher.assignments.marking.analytics',
                            component: IndividualAnalytics,
                            meta: teacherAccessControlMeta,
                            props: true,
                        },
                        {
                            path: 'marking',
                            name: 'teacher.assignments.marking.snapped_answer.edit',
                            component: EditSnappedAnswer,
                            meta: teacherAccessControlMeta,
                            props: true,
                            beforeEnter: (to, from, next) => {
                                if (!from.name) {
                                    return next({name: 'teacher.assignments.marking.details',
                                        params: {
                                            assignmentID: to.params.assignmentID,
                                            submissionID: to.params.submissionID
                                        }
                                    })
                                } else {
                                    return next()
                                }
                            }
                        },
                        {
                            path: 'feedback',
                            name: 'teacher.assignments.marking.feedback',
                            component: AssignmentMarkFeedback,
                            meta: teacherAccessControlMeta,
                            props: true,
                            beforeEnter: (to, from, next) => {
                                if (!from.name) {
                                    return next({name: 'teacher.assignments.marking.details',
                                        params: {
                                            assignmentID: to.params.assignmentID,
                                            submissionID: to.params.submissionID
                                        }
                                    })
                                } else {
                                    return next()
                                }
                            }
                        },
                        {
                            path: 'add-mark',
                            name: 'teacher.assignments.marking.add_mark',
                            component: AssignmentAddMark,
                            meta: teacherAccessControlMeta,
                            props: true,
                            beforeEnter: (to, from, next) => {
                                if (!from.name) {
                                    return next({name: 'teacher.assignments.marking.details',
                                        params: {
                                            assignmentID: to.params.assignmentID,
                                            submissionID: to.params.submissionID
                                        }
                                    })
                                } else {
                                    return next()
                                }
                            }
                        }

                    ]
                }
            ]
        }
    ]
}
