<template>
  <div :class="containerClass" class="h-screen">

    <!-- OVERLAYS -->
    <div v-if="states.isShowingModal" @click="closeModalMode"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-gray-primary bg-opacity-75 ">
    </div>
    <div v-if="states.isSelectingSticker" @click="toggleStickerBar"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-filter-blue bg-opacity-40 ">
    </div>


    <!-- MODAL -->
    <div v-if="states.isShowingModal"
         class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70">
      <modal class="w-4/5 " modal-type="error" @toggleModal="closeModalMode">
        <template slot="message">
          You must add mark for this assignment.
        </template>
        <template slot="button">
          Okay
        </template>
      </modal>
    </div>


    <!-- HEADER -->
    <page-header-three :background-color="headerBackgroundColor" :bottom-padding="4">

      <template v-slot:leftAction>
        <nav-back v-if="states.isMain" class="w-2/3" :stroke-color="navBackColor"/>

        <div @click="togglePreviewMode" v-if="states.isPreviewing">
          <icon-base-two class="w-2/3">
            <arrow-back-icon :stroke-color="navBackColor"/>
          </icon-base-two>
        </div>
      </template>

      <template v-slot:title v-if="states.isPreviewing">
        Answer Preview
      </template>

      <template v-slot:rightAction v-if="states.isMain">
        <div @click="togglePreviewMode" class="flex flex-row justify-end">
          <icon-base-two class="w-1/3">
            <expand-image-icon/>
          </icon-base-two>
        </div>
      </template>

    </page-header-three>

    <!-- CONTENT -->
    <router-view

        :states="states"

        :assignment-details="assignmentDetails"

        @feedback="handleFeedback"
        :feedback="submission.feedback"

        @marks="handleMark"
        :new-marks="submission.marks"

        @nowMarking="handleNowMarking"
        :now-marking="nowMarking"

        :now-loading-sticker="nowLoadingSticker"
    />

    <!-- BOTTOM BAR -->
    <bottom-bar
        :states="states"
        :isMarkedAssignment="isMarkedAssignment"

        @togglePreviewMode="handleTogglePreviewMode"
        @toggleMarkingMode="handleToggleMarkingMode"
        @toggleStickerBar="handleToggleStickerBar"
        @loadSticker="handleLoadSticker"
        @submit="submit"
    />

  </div>
</template>

<script>
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import ExpandImageIcon from "@/components/icons/ExpandImageIcon";
import BottomBar from "@/views/teachers/TeacherAssignments/Mark/Components/BottomBar";
import SubmissionRepository from "@/repositories/SubmissionRepository";
import Modal from "@/components/Modal";
import MarksRepository from "@/repositories/teachers/MarksRepository";

export default {
  name: "Index",
  props: {
    submissionID: [String, Number]
  },
  data() {
    return {
      // States
      states: {
        isLoading: true,
        isMain: true,
        isPreviewing: false,
        isMarking: false,
        isSelectingSticker: false,
        isWritingFeedback: false,
        isShowingModal: false
      },

      // Assignment Details
      assignmentDetails: {
        submissionID: null,
        studentID: null,
        studentName: null,
        assignmentID: null,
        assignmentTitle: null,
        snappedAnswerPaths: null,
        writtenAnswer: null,
        marks: null,
        createdAt: null,
        updatedAt: null,
        submittedTime: null,
        submittedDate: null
      },

      nowMarking: null,
      nowLoadingSticker: null,

      submission: {
        feedback: '',
        marks: null
      }
    }
  },


  watch: {
    '$route': 'handleRouteChange'
  },
  computed: {

    containerClass: function () {
      let value = 'bg-white';

      if (this.states.isMarking) {
        value = 'bg-black-primary';
      }

      return value;
    },

    headerBackgroundColor: function () {

      let value = 'bg-black-primary';

      if (this.states.isPreviewing || this.states.isWritingFeedback) {
        value = 'bg-white'
      }
      return value;
    },

    navBackColor: function () {
      if (this.states.isPreviewing) {
        return 'purple-primary'
      } else {
        return 'white'
      }
    },

    isMarkedAssignment: function () {
      return this.assignmentDetails.marks !== null;
    },

  },
  methods: {
    handleRouteChange() {
      let path = this.$route.name;

      if (path === 'teacher.assignments.marking.details') {
        this.resetState();
        this.states.isMain = true;
      }

      if (path === 'teacher.assignments.marking.feedback') {
        this.resetState();
        this.states.isWritingFeedback = true;
      }
    },

    // SUBMISSIONS
    handleFeedback(value) {
      this.submission.feedback = value
    },
    handleMark(value) {
      this.submission.marks = value
    },

    handleNowMarking(path) {
      this.resetState();
      this.states.isMarking = true;

      this.nowMarking = path;
    },

    // MODE: PREVIEW
    handleTogglePreviewMode() {
      this.togglePreviewMode()
    },
    togglePreviewMode() {
      this.states.isPreviewing = !this.states.isPreviewing;
      this.states.isMain = !this.states.isMain;

      if (this.states.isPreviewing) {
        this.states.isMarking = false;
      }
    },

    handleToggleMarkingMode () {
      this.resetState();
      this.states.isMain = true
    },

    // MODE: MODAL
    closeModalMode() {
      this.resetState()
      this.states.isMain = true;
    },

    // MODE: STICKER
    handleToggleStickerBar() {
      this.toggleStickerBar()
    },
    handleLoadSticker(stickerName) {
      this.nowLoadingSticker = stickerName;
      this.toggleStickerBar();
    },
    toggleStickerBar() {
      let value = !this.states.isSelectingSticker;
      this.resetState();
      this.states.isMarking = true;
      this.states.isSelectingSticker = value;
    },

    // SUBMISSION DETAILS
    fetchData() {
      SubmissionRepository.find(this.submissionID)
          .then(response => {
            let data = response.data.submission_details;

            this.assignmentDetails.submissionID = data.submission_id;
            this.assignmentDetails.studentID = data.student_id;
            this.assignmentDetails.studentName = data.student_name;
            this.assignmentDetails.assignmentID = data.assignment_id;
            this.assignmentDetails.assignmentTitle = data.assignment_title;
            this.assignmentDetails.writtenAnswer = data.written_answer;
            this.assignmentDetails.createdAt = data.created_at;
            this.assignmentDetails.updatedAt = data.updated_at;
            this.assignmentDetails.submittedTime = data.submission_time;
            this.assignmentDetails.submittedDate = data.submission_date;
            this.assignmentDetails.marks = data.marks;

            if (data.snap_answer_url) {
              this.assignmentDetails.snappedAnswerPaths = data.snap_answer_url.split(',');
            }

            this.states.isLoading = false;
          });
    },


    submit() {

      if (this.submission.marks === null || this.submission.marks === undefined) {
        this.resetState()
        this.states.isMain = true;
        this.states.isShowingModal = true;
      } else {
        MarksRepository.store(
            {
              assignmentID: this.assignmentDetails.assignmentID,
              studentID: this.assignmentDetails.studentID,
              answerID: this.assignmentDetails.submissionID,
              // snappedAnswers: [],
              marks: this.submission.marks,
              feedback: this.submission.feedback
            })
            .then(response => {
              let content = response.data;

              let type = content.messageType;
              let message = content.message;

              let data = content.data;

              this.assignmentDetails.marks = data.marks;
            })
      }
    },

    resetState() {
      this.states.isLoading = false;
      this.states.isMain = false;
      this.states.isPreviewing = false;
      this.states.isMarking = false;
      this.states.isSelectingSticker = false;
      this.states.isWritingFeedback = false;
      this.states.isShowingModal = false
    }
  },
  mounted() {
    this.fetchData()
  },
  components: {Modal, BottomBar, ExpandImageIcon, ArrowBackIcon, IconBaseTwo, NavBack, PageHeaderThree},

}
</script>

<style scoped>

</style>
