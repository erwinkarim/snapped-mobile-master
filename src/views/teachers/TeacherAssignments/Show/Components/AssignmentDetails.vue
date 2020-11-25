<template>
  <dashboard-layout>

    <template v-slot:content>
      <div class="flex flex-col">
        <div class="relative w-full justify-center">

          <!-- Background Stack Green -->
          <div class="absolute w-full z-0 sm:z-10 md:z-20 lg:z-30 xl:z-40 h-screen">
            <div class=" bg-green-primary h-1/3">

            </div>
          </div>
          <!-- Background Stack Overlay -->
          <div class="absolute w-full z-10  sm:z-10 md:z-20 lg:z-30 xl:z-40 h-screen">
            <div class=" bg-black bg-opacity-10 h-1/3">

            </div>
          </div>

          <!-- Page Content -->
          <div class="absolute w-full z-20 mb-32">

            <!-- HEADER with Nav Back -->
            <div class="flex flex-row w-full justify-between pt-16 px-5">
              <nav-back class="w-1/12" stroke-color="white"/>
            </div>

            <!-- TIMER -->
            <div class="w-full flex flex-row justify-center items-center mt-7">
              <div class="flex flex-col w-3/5">
                <div class="text-white font-bold text-sm">
                  Assignment Time Remaining
                </div>
                <div class=" bg-green-primary mt-3 py-1 rounded-full">

                  <div class="text-white font-bold text-3xl tracking-wider">
                   <countdown-timer v-if="assignment.dueDatetime"
                                    :due-date-time="assignment.dueDatetime"
                                    :has-twenty-four-hour-limit="false"
                                    :has-clock-icon="true"
                   />
                    <div v-else> -- : -- : -- </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Assignment Detail Card -->
            <div class="px-8 mt-8">
              <div class="bg-gray-secondary rounded-2xl text-left py-8 px-6">
                <!-- TITLE -->
                <div class="font-semibold text-2xl text-purple-primary">
                  {{assignment.title }}
                </div>

                <!-- DETAILS -->
                <div class="flex flex-row  text-xs-plus text-purple-secondary mt-2 justify-between">
                  <div class="pr-1 truncate w-1/3">
                    {{ meta.subjectName || '' }}
                  </div>
                  <div class="px-1 truncate w-1/3">
                    {{ meta.classroomName || '' }}
                  </div>
                  <div class="px-1 truncate w-2/5">
                    {{ getHumanDate(assignment.createdAt)}}
                  </div>
                </div>

                <!-- Written Question -->
                <div v-if="hasWrittenQuestion" class="mt-8 text-purple-primary text-xs-plus flex flex-col">
                  <div v-if="assignment.written_question.title" class="mb-2 truncate">
                    {{  assignment.written_question.title }}
                  </div>
                  <text-multiline-truncate v-if="assignment.written_question.description" :text="assignment.written_question.description" :lines="7" />
                </div>
              </div>
            </div>

            <!-- Submissions -->
            <div class="mt-8 px-8">
              <div class="flex flex-row justify-between text-purple-primary font-bold">
                <div>
                  Submission
                </div>
                <div v-if="meta.totalSubmissions && meta.totalStudents" class="tracking-wide">
                  {{meta.totalSubmissions}}/{{meta.totalStudents}}
                </div>
              </div>

              <div v-if="hasSubmissions" class="mt-4">
                <assignment-submission-card
                    v-for="submission in submissions"
                    :submission="submission"
                    :meta="meta" class="mb-3"/>
              </div>
              <div v-else class="text-purple-secondary text-xs-plus text-left mt-4">
                No ongoing submissions at the moment.
              </div>

            </div>

          </div>


        </div>

      </div>
    </template>

  </dashboard-layout>
</template>

<script>

import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PenIcon from "@/components/icons/PenIcon";
import CameraIcon from "@/components/icons/CameraIcon";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import AssignmentSubmissionCard from "@/components/AssignmentSubmissionCard";
import moment from "moment";
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import CountdownTimer from "@/components/CountdownTimer";

export default {
  name: "AssignmentDetails",
  components: {
    CountdownTimer,
    TextMultilineTruncate,
    AssignmentSubmissionCard,
    CameraIcon,
    PenIcon, DashboardLayout, MagnifyingGlassIcon, IconBaseTwo, NavBack
  },
  props: {
    assignmentID: [String, Number]
  },
  data() {
    return {
      assignment: {
        id: null,
        title: null,
        createdAt: null,
        dueDatetime: null,
        written_question: {
          title: null,
          description: null
        }
      },
      submissions: [],
      meta: {
        classroomID: null,
        classroomName: null,
        subjectID: null,
        subjectName: null,
        totalSubmissions: null,
        totalStudents: null
      }
    }
  },
  computed: {
    hasSubmissions: function () {
      return Array.isArray(this.submissions) && this.submissions.length > 0;
    },

    hasWrittenQuestion: function () {
      return this.assignment.written_question.title || this.assignment.written_question.description;
    },
  },
  methods: {
    fetchData() {
      AssignmentRepository.find(this.assignmentID)
          .then(response => {
            let data = response.data;

            // Assignment Details
            this.assignment.id = data.assignment_details.assignment_id;
            this.assignment.title = data.assignment_details.title;
            this.assignment.createdAt = data.assignment_details.assignment_created_at;
            this.assignment.dueDatetime = data.assignment_details.due_datetime;
            this.assignment.written_question.title = data.assignment_details.written_question_title;
            this.assignment.written_question.description = data.assignment_details.written_question_description;

            // Assignment meta
            this.meta.classroomID = data.assignment_details.classroom_id;
            this.meta.classroomName = data.assignment_details.classroom_name;
            this.meta.subjectID = data.assignment_details.subject_id;
            this.meta.subjectName = data.assignment_details.subject_name;
            this.meta.totalSubmissions = data.total_of_submissions;
            this.meta.totalStudents = data.total_of_students;

            // Submission

            for (let i = 0; i <  data.submissions_by.length; i++) {

              let submission = data.submissions_by[i];

              let details = {
                id: submission.submission_id,
                studentID : submission.student_id,
                studentName : submission.student_name,
                submittedAt : submission.submission_created_at,
                marksID: submission.marks_id
              }

              this.submissions.push(details)
            }

          });
    },
    getHumanDate(datetime) {

      if (datetime) {
        return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
      } else {
        return ''
      }

    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>

</style>
