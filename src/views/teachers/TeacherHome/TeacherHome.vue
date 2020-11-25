<template>
  <dashboard-layout class=" pt-5">

    <template v-slot:content>
      <div class="px-5">
        <div class="w-3/4">
          <icon-base width="190" height="70" icon-name="app-logo" view-box="0 0 320 18">
            <AppLogo/>
          </icon-base>
        </div>

        <user-profile/>
      </div>

      <div class="pl-5">
        <!-- SECTION: CLASSES -->
        <div class="mt-2">
          <div class="text-left mb-3">
            <section-title class="mb-5" title="Your Classes"/>
          </div>

          <ClassesSwiper class="w-full mt-3"/>
        </div>

        <!-- SECTION: ASSIGNMENTS -->
        <div class="mt-6">
          <div class="text-left mb-3">
            <section-title class="mb-5" title="Active Assignments"/>
          </div>
          <AssignmentSwiper class="mt-3 "/>
        </div>

        <!-- SECTION: SUBMISSIONS -->
        <div class="mt-8">
          <div class="text-left mb-3">
            <section-title class="mb-5" title="Submissions"/>
          </div>
          <assignment-submission-card
              v-for="submission in submissions"
              :submission="submission"
              class="mb-3"/>
        </div>
      </div>

    </template>

  </dashboard-layout>

</template>

<script>
import IconBase from "@/components/IconBase";
import AppLogo from "@/components/icons/AppLogo";
import PlusIcon from "@/components/icons/PlusIcon";
import SectionTitle from "@/components/SectionTitle";
import ClassesSwiper from "@/views/teachers/TeacherHome/ClassesSwiper";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import AssignmentSwiper from "@/views/teachers/TeacherHome/AssignmentSwiper";
import DashboardLayout from "@/views/layout/DashboardLayout";
import SubmissionCard from "@/views/teachers/TeacherHome/SubmissionCard";
import UserProfile from "@/components/UserProfile";
import AssignmentSubmissionCard from "@/components/AssignmentSubmissionCard";
import SubmissionRepository from "@/repositories/SubmissionRepository";
import TeacherRepository from "@/repositories/TeacherRepository";

export default {
  name: "Home",
  data() {
    return {
      submissions: []
    }
  },
  methods: {
    fetchSubmissions() {
      TeacherRepository.getSubmissions(1)
        .then(response => {
          let data = response.data.data;

          for (let i = 0; i <  data.length; i++) {

            let submission = data[i];

            let details = {
              id: submission.submission_id,
              assignmentID: submission.assignment_id,
              studentID : submission.student_id,
              studentName : submission.student_name,
              submittedAt : submission.submission_created_at,
              classroomName : submission.classroom_name,
              subjectName : submission.subject_name
            }

            this.submissions.push(details)
          }
        })
    }
  },
  mounted() {
    this.fetchSubmissions()
  },
  components: {
    AssignmentSubmissionCard,
    UserProfile,
    SubmissionCard,
    DashboardLayout,
    AssignmentSwiper,
    ProfilePhoto,
    ClassesSwiper,
    SectionTitle,
    AppLogo,
    IconBase,
    PlusIcon
  },
}
</script>

<style scoped>

</style>
