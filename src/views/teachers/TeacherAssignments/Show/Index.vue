<template>
  <dashboard-layout
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
      <div class="flex flex-col bg-red-400 w-full">
        <div class=" relative w-full top-1/12">

          <!-- Page Content -->
          <div class="absolute w-full z-20 md:z-40 lg:z-50 mb-32">

            <!-- HEADER with Nav Back -->
            <div v-if="!isPreviewing">
              <page-header-three background-color="bg-transparent" class="relative">
                <template v-slot:leftAction>
                  <nav-back class="w-2/7" :to="{name: 'teacher.assignments'}" stroke-color="white"/>
                </template>

                <template v-slot:rightAction>
                  <div class="flex flex-row justify-end">
                    <router-link :to="{name : 'teacher.assignments.export'}"
                                 class="flex flex-row justify-end items-center font-semibold text-white text-right pr-5"
                    >
                      <font-awesome-icon class="w-full fa-1x text-white" :icon="icons.export"/>
                    </router-link>
                    <router-link :to="{name : 'teacher.assignments.edit'}"
                                 class="flex flex-row justify-end items-center font-semibold text-white text-right pr-5"
                    >
                      <font-awesome-icon class="w-full fa-1x text-white" :icon="icons.edit"/>
                    </router-link>
                  </div>
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
            <div class="mt-8 px-8 mb-8" v-if="!isPreviewing">
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

            <!-- Not Yet Submitted -->
            <div class="mt-4 px-8 mb-24" v-if="!isPreviewing && hasNotSubmitted">
              <div class="flex flex-row justify-between text-purple-primary font-bold">
                <div>
                  Not Submitted
                </div>
                <div v-if="meta.totalNotSubmitted && meta.totalStudents" class="tracking-wide">
                  {{ meta.totalNotSubmitted }}/{{ meta.totalStudents }}
                </div>
              </div>

              <div class="mt-4">
                <unsubmitted-card
                        v-for="submission in not_submitted"
                        :key="submission.student_id"
                        :submission="submission"
                        :meta="meta" class="mb-3"
                />
              </div>
            </div>

          </div>


        </div>

        <div class="relative" v-if="!isPreviewing">
          <!-- Background Stack Green -->
          <div class=" top-0 w-full z-0 sm:z-10 md:z-20 lg:z-30 xl:z-40 bg-green-primary pb-2/3">
            <!-- Background Stack Overlay -->
<!--            <div class="absolute top-0 w-full z-10 sm:z-20 md:z-30 lg:z-40 xl:z-50 bg-black bg-opacity-10  pb-2/3 ">-->
            <div class="absolute top-0 w-full z-10 sm:z-20 md:z-30 lg:z-40 xl:z-100 bg-black bg-opacity-10  pb-2/3 ">
            </div>
          </div>
        </div>

      </div>
    </template>

  </dashboard-layout>
</template>

<script>
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import PageHeaderThree from "@/components/PageHeaderThree";
import AssignmentQuestionCard from "@/components/AssignmentQuestionCard";
import QuestionPreviewSwiper from "@/components/QuestionPreviewSwiper";
import CountdownTimer from "@/components/CountdownTimer";
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import AssignmentSubmissionCard from "@/components/AssignmentSubmissionCard";
import UnsubmittedCard from "../../../../components/UnsubmittedCard";
import CameraIcon from "@/components/icons/CameraIcon";
import PenIcon from "@/components/icons/PenIcon";
import DashboardLayout from "@/views/layout/DashboardLayout";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import IconBaseTwo from "@/components/IconBaseTwo";
import NavBack from "@/components/NavBack";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import moment from "moment";

import {faFileExport, faEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default {
  name: "Index",
  props: {
    assignmentID: [String, Number]
  },
  data() {
    return {

      icons: {
        export: faFileExport,
        edit: faEdit
      },

      // Status
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
        remarks: null,
        snap_question_paths: []
      },
      submissions: [],
      meta: {
        classroomID: null,
        classroomName: null,
        subjectID: null,
        subjectName: null,
        totalSubmissions: null,
        totalStudents: null,
        totalNotSubmitted: null
      },
      not_submitted: []
    }
  },
  computed: {
    hasSubmissions: function () {
      return Array.isArray(this.submissions) && this.submissions.length > 0;
    },

    hasNotSubmitted: function(){
      return Array.isArray(this.not_submitted) && this.not_submitted.length > 0;
    },

    hasWrittenQuestion: function () {
      return this.assignment.written_question.title || this.assignment.written_question.description;
    },

    hasSnappedQuestion: function () {
      return this.assignment.snap_question_paths.length > 0;
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
              this.assignment.remarks = data.assignment_details.remarks;

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
              this.meta.totalNotSubmitted = data.not_yet_submitted.length;

              // Submission

              for (let i = 0; i < data.submissions_by.length; i++) {

                let submission = data.submissions_by[i];

                let details = {
                  id: submission.submission_id,
                  studentID: submission.student_id,
                  studentName: submission.student_name,
                  studentGender: submission.student_gender,
                  submittedAt: submission.submission_created_at,
                  marksID: submission.marks_id,
                  marks: submission.marks,
                  answerTag: submission.answer_tag,
                  assignmentID: data.assignment_details.assignment_id
                }

                this.submissions.push(details)
              }

              // Not Yet Submitted

              for (let i = 0; i < data.not_yet_submitted.length; i++) {

                let not_submitted = data.not_yet_submitted[i];

                let details = {
                  studentID: not_submitted.student_id,
                  studentName: not_submitted.student_name,
                  studentGender: not_submitted.student_gender,
                }

                this.not_submitted.push(details)
              }
            }

          });
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
    FontAwesomeIcon,
    ArrowBackIcon,
    PageHeaderThree,
    AssignmentQuestionCard,
    UnsubmittedCard,
    QuestionPreviewSwiper,
    CountdownTimer,
    TextMultilineTruncate,
    AssignmentSubmissionCard,
    CameraIcon,
    PenIcon, DashboardLayout, MagnifyingGlassIcon, IconBaseTwo, NavBack
  },
}
</script>

<style scoped>

</style>
