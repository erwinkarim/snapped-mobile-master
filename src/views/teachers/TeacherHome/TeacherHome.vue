<template>
  <dashboard-layout class=" pt-5">

    <template v-slot:content>
      <div class="px-5 max-w-xl">
        <div class="w-2/7">
          <icon-base-two>
            <AppLogo/>
          </icon-base-two>
        </div>

        <user-profile/>
      </div>

      <div class="max-w-xl">

        <!-- SECTION: SUMMARY -->
        <div class="mt-2 px-5">
          <div class="text-left mb-3">
            <section-title class="mb-5" title="Summary"/>
          </div>

          <div class="max-w-sm md:max-w-xl md:w-full h-full rounded rounded-xl justify-between overflow-hidden bg-gray-secondary px-3 py-3">
            <div class="flex flex-row items-center h-full text-left text-purple-primary">
              <div class="flex flex-col w-1/3 px-2 ">
                <div class="border-b-1 font-bold  py-2">{{ numOfPublishedAssignments }}</div>
                <div class="text-xs-plus mb-1 h-12 py-2">
                  Published Assignments
                </div>
              </div>
              <div class=" flex flex-col w-1/3  px-2 border-l-1 border-r-1">
                <div class=" border-b-1 font-bold  py-2">{{ numOfSubmissions }}</div>
                <div class=" text-xs-plus mb-1 h-12 py-2">Submissions</div>
              </div>
              <div class=" flex flex-col w-1/3 px-2">
                <div class=" border-b-1 font-bold py-2">{{ numOfUnmarkedSubmissions }}</div>
                <div class=" text-xs-plus mb-1 h-12 py-2">Unmarked Submissions</div>
              </div>
            </div>
          </div>
        </div>

        <div class="pl-5">


          <!-- SECTION: CLASSES -->
          <div class="mt-6">
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
            <AssignmentSwiper class="mt-3 " @numOfAssignments="getNumOfAssignments"/>
          </div>

          <!-- SECTION: SUBMISSIONS -->
          <div class="mt-8 pr-5">
            <div class="text-left mb-3">
              <section-title class="mb-5" title="Submissions"/>
            </div>
            <assignment-submission-card
                v-for="submission in submissions"
                :submission="submission"
                class="mb-6"/>
          </div>
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
import IconBaseTwo from "@/components/IconBaseTwo";
import AssignmentRepository from "../../../repositories/AssignmentRepository";

export default {
  name: "Home",
  data() {
    return {
      numOfPublishedAssignments: 0,
      numOfAssignments: 0,
      numOfSubmissions: 0,
      numOfUnmarkedSubmissions: 0,
      submissions: []
    }
  },
  methods: {
    getNumOfAssignments(value){
      this.numOfAssignments = value;
    },
    fetchSummaryData() {
      AssignmentRepository.getPublishedAssignments()
              .then(response => {
                let data = response.data.meta;

                this.numOfPublishedAssignments = data.total;
              })

      TeacherRepository.getSubmissions()
              .then(response => {
                let data = response.data.data;

                this.numOfSubmissions = data.length;
              })

      TeacherRepository.getMarkings()
              .then(response => {
                let data = response.data.num_of_unmarked_submissions;

                this.numOfUnmarkedSubmissions = data ;
              })
    },
    fetchSubmissions(){
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
              studentGender : submission.gender,
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
    this.fetchSummaryData()
  },
  components: {
    IconBaseTwo,
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
