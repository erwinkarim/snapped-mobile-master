<template>
    <div :class="isUnanswered ? 'bg-red-200 bg-opacity-50' : 'bg-gray-secondary'" class="max-w-sm md:max-w-xl rounded rounded-xl justify-between overflow-hidden flex flex-col px-3 py-3 md:py-5 ">
        <div class="flex flex-row items-center h-full">

            <div class="w-2/12">
                <icon-base-two class=" w-full">
                    <profile-photo :gender="submission.studentGender"/>
                </icon-base-two>
            </div>

            <div class="w-9/12 flex-col md:justify-between pl-2">
                <div class="text-left text-purple-primary text-xs-plus mb-1  truncate pr-4">
                    {{ submission.studentName || '' }}
                </div>
                <div class="flex flex-row text-left text-px-10 text-purple-secondary">
                    <div class="w-1/4 truncate"> {{ subjectName }}</div>
                    <div class="w-1/4 truncate"> {{ classroomName }}</div>
                    <div class="w-2/4 truncate"> {{ getHumanDate(submission.submittedAt) }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import IconBaseTwo from "@/components/IconBaseTwo";
    import ProfilePhoto from "@/components/icons/ProfilePhoto";
    import moment from "moment";
    // import router from "@/router";
    import SuccessIcon from "@/components/icons/SuccessIcon";
    import ErrorIcon from "@/components/icons/ErrorIcon";

    export default {
        name: "AssignmentSubmissionCard",
        props: {
            submission: Object,
            meta: {
                type: Object,
                default: null
            },
            allowShowSubmission: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            subjectName () {
                if (this.meta) {
                    return this.meta.subjectName;
                } else if (this.submission.subjectName) {
                    return this.submission.subjectName
                } else {
                    return ''
                }
            },
            classroomName () {
                if (this.meta) {
                    return this.meta.classroomName;
                } else if (this.submission.classroomName) {
                    return this.submission.classroomName
                } else {
                    return ''
                }
            },
            submittedAt() {
            },
            isUnanswered() { return false },
        },
        methods: {
            getHumanDate(datetime) {

                if (datetime) {
                    return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
                } else {
                    return ''
                }

            },
            showSubmission(submissionID) {
                if (this.allowShowSubmission) {
                    this.$router.push({name: 'teacher.assignments.marking.details', params: { assignmentID: this.submission.assignmentID, submissionID: this.submission.id }})
                }
            }
        },
        components: {SuccessIcon, ProfilePhoto, IconBaseTwo, ErrorIcon}
    }
</script>

<style scoped>

</style>
