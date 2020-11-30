<template>
  <dashboard-layout :has-fixed-header="true" :has-custom-bottom-bar="true">


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
            <div class="flex flex-row w-full justify-between pt-3/24 px-5">
              <nav-back class="w-1/12" stroke-color="white" :to="{name: 'student.assignments'}"/>
            </div>

            <!-- TIMER -->
            <div class="w-full flex flex-row justify-center items-center mt-1/24">
              <div class="flex flex-col w-1/2">
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
            <div class="mt-8 px-8  mb-32">
              <div class="flex flex-row justify-between text-purple-primary font-bold">
                <div>
                  Submission
                </div>
              </div>

              <div v-if="hasSubmissions" class="mt-4 ">
                <assignment-submission-card
                    v-for="submission in submissions"
                    :key="submission.id"
                    :submission="submission"
                    :meta="meta"
                    :allow-show-submission="false"
                    class="mb-3"
                />
              </div>
              <div v-else class="text-purple-secondary text-xs-plus text-left mt-4">
                No ongoing submissions at the moment.
              </div>

            </div>

          </div>


        </div>

      </div>
    </template>

    <template v-slot:bottomBar>

      <div v-if="!isLoading" class="w-full">

        <div v-if="hasEditableSubmission" class="w-full">
          <router-link :to="{name:'student.assignments.answer.edit', params: { submissionID: studentSubmission.id}}"
                       class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
            Edit Answer
          </router-link>
        </div>

        <div v-else-if="hasMarkedSubmission" class="w-full flex flex-row">
          <div
              class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
            Marked
          </div>
        </div>

        <div v-else class="w-full flex flex-row">

          <div class="w-3/7 px-2">
            <router-link
                :to="{name:'student.assignments.answer.write', params: { assignmentDetails: assignmentDetails }}"
                class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
              <div class="w-5/7">
                Write Answer
              </div>
              <icon-base-two class="w-1/7">
                <pen-icon/>
              </icon-base-two>
            </router-link>
          </div>
          <div class="w-4/7 px-2">

            <label
                class="w-full h-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row items-center justify-center">
              <div class="w-5/7">
                Snapped Answer
                <input class="hidden" type="file" accept='image/*' multiple @change="onFileSelected"/>
              </div>
              <icon-base-two class="w-1/7">
                <camera-icon/>
              </icon-base-two>
            </label>
          </div>
        </div>

      </div>


    </template>

  </dashboard-layout>
</template>

<script>
import AlternateBottomBar from "@/components/BottomNavbar/AlternateBottomBar";
import DashboardLayout from "@/views/layout/DashboardLayout";
import NavBack from "@/components/NavBack";
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import AssignmentSubmissionCard from "@/components/AssignmentSubmissionCard";
import IconBaseTwo from "@/components/IconBaseTwo";
import PenIcon from "@/components/icons/PenIcon";
import CameraIcon from "@/components/icons/CameraIcon";
import moment from "moment";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import CountdownTimer from "@/components/CountdownTimer";
import Modal from "@/components/Modal";
import router from "@/router";
import AssignmentQuestionCard from "@/components/AssignmentQuestionCard";

export default {
  name: "Index",
  props: {
    assignmentID: [String, Number]
  },
  data() {
    return {

      // States
      isLoading: true,

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
      studentSubmission: {
        id: null,
        marks: null
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

    hasEditableSubmission: function () {
      return this.studentSubmission.id !== null && this.studentSubmission.marks === null;
    },

    hasMarkedSubmission: function () {
      return this.studentSubmission.id !== null && this.studentSubmission.marks !== null;
    },

    assignmentDetails() {
      return {
        id: this.assignment.id,
        title: this.assignment.title
      }
    }
  },
  methods: {
    fetchData() {
      AssignmentRepository.find(this.assignmentID)
          .then(response => {
            let data = response.data;

            // Student's Submission
            this.studentSubmission.id = data.student_submission_id;

            // Assignment Details
            this.assignment.id = data.assignment_details.assignment_id;
            this.assignment.title = data.assignment_details.title;
            this.assignment.createdAt = data.assignment_details.assignment_created_at;
            this.assignment.dueDatetime = data.assignment_details.due_datetime;
            this.assignment.written_question.title = data.assignment_details.written_question_title;
            this.assignment.written_question.description = data.assignment_details.written_question_description;

            if (data.assignment_details.snap_question) {
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
                submittedAt: submission.submission_created_at
              }

              // Set student's submission as marked if Mark exists
              if (submission.submission_id === this.studentSubmission.id) {
                submission.marks_id ? this.studentSubmission.marks = submission.marks_id : null;
              }
              this.submissions.push(details)
            }
            this.isLoading = false;
          });
    },
    onFileSelected(e) {
      let files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      router.push({
        name: 'student.assignments.answer.store', params: {
          assignmentDetails: this.assignmentDetails,
          answer: {
            type: 'snapped',
            content: [files[0]]
          }
        }
      })
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
  },
  components: {
    AssignmentQuestionCard,
    Modal,
    CountdownTimer,
    CameraIcon,
    PenIcon,
    IconBaseTwo,
    AssignmentSubmissionCard, TextMultilineTruncate, NavBack, DashboardLayout, AlternateBottomBar
  }
}
</script>

<style scoped>

</style>
