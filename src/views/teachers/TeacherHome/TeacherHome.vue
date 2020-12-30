<template>
  <dashboard-layout class=" pt-5">

    <template v-slot:content>
      <div class="px-5">
        <div class="w-2/7">
          <icon-base-two>
            <AppLogo/>
          </icon-base-two>
        </div>

        <user-profile/>
      </div>

      <div class="pl-5">
        <!-- SECTION: SUMMARY -->
        <div class="mt-2">
          <div class="text-left mb-3">
            <section-title class="mb-5" title="Summary"/>
          </div>

          <div class="w-full mt-3">
            <div class="max-w-sm h-full rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 py-3">
              <div class="flex flex-row grid grid-cols-3 divide-x items-center h-full">
                <div class="grid grid-cols-1 divide-y pl-2">
                  <div class="text-left text-purple-primary font-bold">{{numOfAssignments}}</div>
                  <div class="text-left text-purple-primary text-xs-plus mb-1 h-12 py-2">
                    Published Assignments
                  </div>
                </div>
                <div class="grid grid-cols-1 divide-y pl-3">
                  <div class="text-left text-purple-primary font-bold">{{numOfSubmissions}}</div>
                  <div class="text-left text-purple-primary text-xs-plus mb-1 h-12 py-2">Submissions</div>
                </div>
                <div class="grid grid-cols-1 divide-y pl-4">
                  <div class="text-left text-purple-primary font-bold">{{numOfUnmarkedSubmissions}}</div>
                  <div class="text-left text-purple-primary text-xs-plus mb-1 h-12 py-2">Unmarked Submissions</div>
                </div>
              </div>
            </div>
          </div>
        </div>


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
        <div class="mt-8">
          <div class="text-left mb-3">
            <section-title class="mb-5" title="Submissions"/>
          </div>
          <assignment-submission-card
              v-for="submission in submissions"
              :submission="submission"
              class="mb-6"/>
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

export default {
  name: "Home",
  data() {
    return {
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
    fetchMarkings() {
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
    this.fetchMarkings()
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
