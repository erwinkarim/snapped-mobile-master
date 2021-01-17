<template>
  <dashboard-layout>

    <template v-slot:content>
      <div class="flex flex-col w-full">
        <div class=" relative w-full top-1/12">

          <!-- Page Content -->
          <div class="absolute w-full z-20 md:z-40 lg:z-50 mb-32">

            <!-- HEADER with Nav Back -->
            <page-header-three background-color="bg-transparent" class="relative">
              <template v-slot:leftAction>
                <nav-back class="w-2/7" :to="{name: 'teacher.assignments'}" stroke-color="white"/>
              </template>

              <template v-slot:rightAction>
                <router-link :to="{name : 'teacher.assignments.edit'}"
                             class="flex flex-row justify-end items-center font-semibold text-white text-right pr-5"
                >
                  Edit
                </router-link>
              </template>
            </page-header-three>
            <!-- TIMER -->
            <div class="w-full flex flex-row justify-center items-center mt-7">
              <div class="flex flex-col w-3/5">
                <div class="text-white font-bold text-sm">
                  Time Remaining
                </div>
                <div class=" bg-green-primary mt-3 py-1 rounded-full">

                  <div class="text-white font-bold text-3xl tracking-wider">
                    <countdown-timer v-if="assignment.dueDatetime"
                                     :due-date-time="assignment.dueDatetime"
                                     :has-twenty-four-hour-limit="false"
                                     :has-clock-icon="true"
                    />
                    <div v-else> -- : -- : --</div>
                  </div>
                </div>
              </div>
            </div>


            <!-- Assignment Detail Card -->
            <assignment-question-card
                :assignment="assignment"
                :meta="meta"
            />

            <!-- Submissions -->
            <div class="mt-8 px-8 mb-24">
              <div class="flex flex-row justify-between text-purple-primary font-bold">
                <div>
                  Submissions
                </div>
                <div v-if="meta.totalSubmissions && meta.totalStudents" class="tracking-wide">
                  {{ meta.totalSubmissions }}/{{ meta.totalStudents }}
                </div>
              </div>

              <div v-if="hasSubmissions" class="mt-4">
                <assignment-submission-card
                    v-for="submission in submissions"
                    :key="submission.id"
                    :submission="submission"
                    :meta="meta" class="mb-3"
                />
              </div>
              <div v-else class="text-purple-secondary text-xs-plus text-left mt-4">
                No ongoing submissions at the moment.
              </div>

            </div>

          </div>


        </div>

        <div class="relative">
          <!-- Background Stack Green -->
          <div class=" top-0 w-full z-0 sm:z-10 md:z-20 lg:z-30 xl:z-40 bg-green-primary pb-2/3">
            <!-- Background Stack Overlay -->
            <div class="absolute top-0 w-full z-10 sm:z-20 md:z-30 lg:z-40 xl:z-50 bg-black bg-opacity-10  pb-2/3 ">
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
import QuestionPreviewSwiper from "@/views/teachers/TeacherAssignments/Show/Components/QuestionPreviewSwiper";
import AssignmentQuestionCard from "@/components/AssignmentQuestionCard";
import PageHeaderThree from "@/components/PageHeaderThree";

export default {
  name: "AssignmentDetails",
  components: {
    PageHeaderThree,
    AssignmentQuestionCard,
    QuestionPreviewSwiper,
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
        },
        snap_question_paths: []
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

    hasSnappedQuestion: function () {
      return this.assignment.snap_question_paths.length > 0;
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

            if (data.assignment_details.snap_question_url) {
              this.assignment.snap_question_paths = data.assignment_details.snap_question_url.split(',');
            }

            // Assignment meta
            this.meta.classroomID = data.assignment_details.classroom_id;
            this.meta.classroomName = data.assignment_details.classroom_name;
            this.meta.subjectID = data.assignment_details.subject_id;
            this.meta.subjectName = data.assignment_details.subject_name;
            this.meta.totalSubmissions = data.total_of_submissions;
            this.meta.totalStudents = data.total_of_students;

            // Submission

            for (let i = 0; i < data.submissions_by.length; i++) {

              let submission = data.submissions_by[i];

              let details = {
                id: submission.submission_id,
                studentID: submission.student_id,
                studentName: submission.student_name,
                submittedAt: submission.submission_created_at,
                marksID: submission.marks_id,
                assignmentID: data.assignment_details.assignment_id
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
