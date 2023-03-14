<template>
  <dashboard-layout
      :has-fixed-header="true"
      :has-custom-bottom-bar="!isPreviewing"
      :no-bottom-bar="isPreviewing"
  >

    <template v-slot:pageHeader v-if="isPreviewing">
      <page-header-three background-color="bg-transparent" class="relative">
        <template v-slot:leftAction>
          <div class="w-2/7" @click="handleTogglePreview">
            <icon-base-two>
              <arrow-back-icon/>
            </icon-base-two>
          </div>
        </template>

        <template v-if="swiperDetails" v-slot:rightAction>
          <div class="text-sm md:text-xl font-semibold text-purple-primary">
            {{ `${swiperActiveSlideNumber} / ${swiperSlidesCount}` }}
          </div>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>

      <div class="flex flex-col w-full max-w-xl">
        <div class="relative justify-center w-full">

          <!-- Page Content -->
          <div class="absolute z-20 md:z-40 mb-32 w-full">

            <div v-if="!isPreviewing">
              <!-- HEADER with Nav Back -->
              <div class="flex flex-row justify-between px-5 w-full pt-3/24">
                <nav-back class="w-1/12" stroke-color="white" :to="{name: 'student.assignments'}"/>
              </div>

              <!-- TIMER -->
              <div class="flex flex-row justify-center items-center w-full mt-1/24">
                <div class="flex flex-col w-1/2">
                  <div class="text-sm font-bold text-white">
                    Time Remaining
                  </div>
                  <div class="py-1 mt-3 rounded-full bg-green-primary">

                    <div class="text-3xl font-bold tracking-wider text-white">
                      <countdown-timer v-if="assignment.dueDatetime"
                                       :due-date-time="assignment.dueDatetime"
                                       :has-twenty-four-hour-limit="false"
                                       :has-clock-icon="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <!-- Assignment Detail Card -->
            <assignment-question-card
                :assignment="assignment"
                :meta="meta"
                :is-previewing="isPreviewing"
                v-on:togglePreview="handleTogglePreview"
                v-on:swiperDetails="handleSwiperDetails"

            />

            <!-- Submissions -->
            <div class="px-8 mt-8 mb-32" v-if="!isPreviewing">
              <div class="flex flex-row justify-between font-bold text-purple-primary">
                <div>
                  Submission
                </div>
              </div>

              <div v-if="hasSubmission" class="mt-4">
                <assignment-submission-card
                    :submission="submission"
                    :meta="meta"
                    :allow-show-submission="false"
                    class="mb-3"
                />
              </div>
              <div v-else class="mt-4 text-left text-purple-secondary text-xs-plus">
                No ongoing submissions at the moment.
              </div>

            </div>

          </div>


        </div>


        <div class="relative" v-if="!isPreviewing">
          <!-- Background Stack Green -->
          <div class="top-0 z-0 w-full md:max-w-xl sm:z-10 md:z-20 bg-green-primary pb-2/3">
            <!-- Background Stack Overlay -->
            <div class="absolute top-0 z-10 w-full bg-black bg-opacity-10 md:max-w-xl sm:z-20 md:z-30 pb-2/3"></div>
          </div>
        </div>

      </div>
    </template>

    <template v-slot:bottomBar>

      <div v-if="!isLoading" class="w-full md:max-w-xl">

        <div v-if="hasEditableSubmission && !isPastDueDate" class="w-full">
          <router-link :to="{name:'student.assignments.answer.edit', params: { submissionID: submission.id}}"
                       class="flex flex-row justify-center py-3 px-1 w-full text-sm font-bold bg-white rounded-full border-2 text-purple-primary border-purple-primary">
            Edit Answer
          </router-link>
        </div>

        <div v-else-if="hasEditableSubmission && isPastDueDate" class="w-full">
          <div
              class="flex flex-row justify-center py-3 px-1 w-full text-sm font-bold bg-white rounded-full border-2 text-purple-primary border-purple-primary">
            Submitted
          </div>
        </div>

        <div v-else-if="hasMarkedSubmission ">

          <div v-if="isUnanswered"
               class="flex flex-row justify-center tracking-wider py-3 px-1 w-full text-sm font-bold bg-red-primary rounded-full border-2 text-white border-red-primary"
          >
            UNANSWERED
          </div>

          <router-link v-else
                       :to="{name: 'student.marked.show', params: {marksID: marks_id}}"
                       class="flex flex-row justify-center py-3 px-1 w-full text-sm font-bold bg-white rounded-full border-2 text-purple-primary border-purple-primary"
          >
            View Marking
          </router-link>


        </div>

        <div v-else class="flex flex-row w-full">

          <!-- BUTTON: WRITE ANSWER -->
          <!--          <div class="flex-grow px-2">-->
          <!--            <router-link-->
          <!--                :to="{name:'student.assignments.answer.write', params: { assignmentDetails: assignmentDetails }}"-->
          <!--                class="flex flex-row justify-center py-3 px-1 w-full text-sm font-bold bg-white rounded-full border-2 text-purple-primary border-purple-primary">-->
          <!--              <div class="w-5/7">-->
          <!--                Write Answer-->
          <!--              </div>-->
          <!--              <icon-base-two class="hidden w-1/7 xs:block">-->
          <!--                <pen-icon/>-->
          <!--              </icon-base-two>-->
          <!--            </router-link>-->
          <!--          </div>-->
          <div class="flex-grow px-2">

            <label
                class="flex flex-row justify-center items-center py-3 px-1 w-full h-full text-sm font-bold rounded-full text-purple-primary bg-yellow-primary">
              <div class="mr-3">
                Snap Answer
                <input @change="onFileSelected"
                       type="file"
                       accept='image/*'
                       multiple
                       class="hidden"
                />
              </div>
              <icon-base-two class="hidden w-1/12 xs:block">
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
import PageHeaderThree from "@/components/PageHeaderThree";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";

export default {
  name: "Index",
  props: {
    assignmentID: [String, Number]
  },
  data() {
    return {

      // States
      isLoading: true,
      isPreviewing: false,

      // Swiper details
      swiperDetails: null,

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

      // Student's Submission and Marks details
      submission: null,
      marks_id: null,

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
    hasSubmission: function () {
      return this.submission !== null;
    },

    hasEditableSubmission: function () {
      return this.hasSubmission ? this.submission.id !== null && this.marks_id === null : null;
    },

    isPastDueDate() {
      return moment().format('YYYY-MM-DD HH:mm:ss') >= this.assignment.dueDatetime;
    },

    isUnanswered() {
      if (this.submission.answerTag) {
        return this.submission.answerTag === 'unanswered';
      }

      return false;
    },

    hasMarkedSubmission: function () {
      return this.hasSubmission ? this.submission.id !== null && this.marks_id !== null : null;
    },

    assignmentDetails() {
      return {
        id: this.assignment.id,
        title: this.assignment.title
      }
    },

    swiperActiveSlideNumber() {
      return this.swiperDetails ? this.swiperDetails.activeSlideIndex + 1 : '-';
    },

    swiperSlidesCount() {
      return this.swiperDetails ? this.swiperDetails.slidesCount : 0;
    },

  },
  methods: {
    fetchData() {

      AssignmentRepository.find(this.assignmentID)
          .then(response => {

            if (response.data.success) {

              let data = response.data.data;

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

              if (data.assignment_details.recording_url){
                this.assignment.recording_path = data.assignment_details.recording_url;
              }

              if (data.assignment_details.remarks){
                this.assignment.remarks = data.assignment_details.remarks;
              }

              console.log('assignment', this.assignment);

              // Assignment meta
              this.meta.classroomID = data.assignment_details.classroom_id;
              this.meta.classroomName = data.assignment_details.classroom_name;
              this.meta.subjectID = data.assignment_details.subject_id;
              this.meta.subjectName = data.assignment_details.subject_name;
              this.meta.totalSubmissions = data.total_of_submissions;
              this.meta.totalStudents = data.total_of_students;

              // Student's Submission
              let submission = data.submissions_by[0];

              if (submission) {
                this.submission = {
                  id: submission.submission_id,
                  studentID: submission.student_id,
                  studentName: submission.student_name,
                  studentGender: submission.student_gender,
                  submittedAt: submission.submission_created_at,
                  answerTag: submission.answer_tag
                }
                this.marks_id = submission.marks_id
              }


              this.isLoading = false;
            }


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

    handleTogglePreview() {
      this.isPreviewing = !this.isPreviewing;
    },

    handleSwiperDetails(data) {
      this.swiperDetails = data
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
    ArrowBackIcon,
    PageHeaderThree,
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
