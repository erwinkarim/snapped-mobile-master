<template>
  <div :class="containerClass" class="h-screen">

    <!-- OVERLAYS -->
    <div v-if="$store.state.teacherMarking.states.isShowingModal" @click="closeModalMode()"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-gray-primary bg-opacity-75 ">
    </div>
    <div v-if="$store.state.teacherMarking.states.isSelectingSticker" @click="toggleStickerBar"
         class="fixed w-full h-screen z-70 flex flex-col justify-center items-center inset-x-0 block top-0 bg-filter-blue bg-opacity-40 ">
    </div>


    <!-- MODAL -->
    <div v-if="$store.state.teacherMarking.states.isShowingModal"
         class="fixed left-0 w-full items-center flex flex-col items-center justify-center top-1/4 z-70">
      <modal modal-type="error"
             @toggleModal="closeModalMode()"
             :redirect-route="{name: 'teacher.assignments.marking.add_mark'}"
             class="w-4/5 "
      >
        <template slot="message">
          You must add mark for this assignment.
        </template>
        <template slot="button">
          Okay
        </template>
      </modal>
    </div>


    <!-- HEADER -->
    <page-header-three :background-color="headerBackgroundColor"
                       :bottom-padding="8"
    >

      <template v-slot:leftAction>
        <nav-back v-if="$store.state.teacherMarking.states.isMain"
                  :to="{name: 'teacher.assignments.show'}"
                  class="w-1/4"
                  :stroke-color="navBackColor"
        />

        <div @click="togglePreviewMode" v-if="$store.state.teacherMarking.states.isPreviewing">
          <icon-base-two class="w-1/4 ml-6">
            <arrow-back-icon :stroke-color="navBackColor"/>
          </icon-base-two>
        </div>
      </template>

      <template v-slot:title v-if="$store.state.teacherMarking.states.isPreviewing">
        Answer Preview
      </template>

      <template v-slot:rightAction>
        <div v-if="$store.state.teacherMarking.states.isMain" class="flex flex-row justify-end items-center mr-5">
          <div @click="togglePreviewMode" :to="{name: 'student.class.classmates'}" class="w-2/7 ">
            <icon-base-two>
              <expand-image-icon/>
            </icon-base-two>
          </div>
        </div>
      </template>

    </page-header-three>

    <!-- CONTENT -->
    <div class="relative">
<!--      <router-view-->

<!--          :assignment-details="assignmentDetails"-->

<!--          @feedback="handleFeedback"-->
<!--          :feedback="submission.feedback"-->

<!--          @marks="handleMark"-->
<!--          :new-marks="submission.marks"-->

<!--          @nowMarking="handleNowMarking"-->
<!--          :now-marking="nowMarking"-->

<!--          @editedSnappedAnswer="handleEditedSnappedAnswer"-->

<!--          :now-loading-sticker="nowLoadingSticker"-->
<!--          :now-loading-text-bar="nowLoadingTextBar"-->
<!--      />-->
      <router-view/>
    </div>


    <!-- BOTTOM BAR -->
<!--    <bottom-bar-->
<!--        :states="states"-->

<!--        @togglePreviewMode="handleTogglePreviewMode"-->
<!--        @toggleMarkingMode="handleToggleMarkingMode"-->
<!--        @toggleStickerBar="handleToggleStickerBar"-->
<!--        @loadSticker="handleLoadSticker"-->
<!--        @loadTextBar="handleLoadTextBar"-->
<!--        @saveEditedSnappedAnswer="handleSaveEditedSnappedAnswer"-->
<!--        @submit="submit"-->
<!--    />-->

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
import router from "@/router";
import moment from "moment";

export default {
  name: "Index",
  props: {
    submissionID: [String, Number],
    markID: [String, Number],
  },
  data() {
    return {
      // States
      // states: {
      //   isLoading: true,
      //   isMain: true,
      //   isPreviewing: false,
      //   isMarking: false,
      //   isSelectingSticker: false,
      //   isWritingFeedback: false,
      //   isShowingModal: false,
      //   isSavingEditedSnappedAnswer: false
      // },

      // Assignment Details
      assignmentDetails: {
        submissionID: null,
        studentID: null,
        studentName: null,
        assignmentID: null,
        assignmentTitle: null,
        snappedAnswerPaths: null,
        writtenAnswer: null,
        createdAt: null,
        updatedAt: null,
        submittedTime: null,
        submittedDate: null,
        marksID: null,
        marks: null,
        markedSnappedAnswerPaths: null
      },

      nowMarking: null,
      nowLoadingSticker: null,
      nowLoadingTextBar: false,

      submission: {
        type: '',
        snappedAnswers: [],
        feedback: '',
        marks: null
      }
    }
  },


  watch: {
    '$route': 'handleRouteChange',
  },
  computed: {

    containerClass: function () {
      let value = 'bg-white';

      if (this.$store.state.teacherMarking.states.isMarking) {
        value = 'bg-black-primary';
      }

      return value;
    },

    headerBackgroundColor: function () {

      let value = 'bg-black-primary';

      if (this.$store.state.teacherMarking.states.isPreviewing || this.$store.state.teacherMarking.states.isWritingFeedback) {
        value = 'bg-white'
      }
      return value;
    },

    navBackColor: function () {
      if (this.$store.state.teacherMarking.states.isPreviewing) {
        return 'purple-primary'
      } else {
        return 'white'
      }
    },

    // isMarkedAssignment: function () {
    //   return this.assignmentDetails.marksID !== null && this.assignmentDetails.marksID !== undefined;
    // },

  },
  methods: {
    handleRouteChange() {

      let path = this.$route.name;

      if (path === 'teacher.assignments.marking.details') {
        this.resetState();
        this.$store.state.teacherMarking.states.isMain = true;
      }

      if (path === 'teacher.assignments.marking.feedback') {
        this.resetState();
        this.$store.state.teacherMarking.states.isWritingFeedback = true;
      }

    },

    // SUBMISSIONS
    handleFeedback(value) {
      this.submission.feedback = value
    },
    handleMark(value) {
      this.submission.marks = value
    },

    handleNowMarking(nowMarking) {
      this.resetState();
      this.$store.state.teacherMarking.states.isMarking = true;

      this.nowMarking = nowMarking;
    },

    // MODE: PREVIEW
    handleTogglePreviewMode() {
      this.togglePreviewMode()
    },
    togglePreviewMode() {
      this.$store.commit('teacherMarking/togglePreviewMode')

      console.log(this.$store.state.teacherMarking.states)
    },
    // togglePreviewMode() {
    //   this.$store.state.teacherMarking.states.isPreviewing = !this.$store.state.teacherMarking.states.isPreviewing;
    //   this.$store.state.teacherMarking.states.isMain = !this.$store.state.teacherMarking.states.isMain;
    //
    //   if (this.$store.state.teacherMarking.states.isPreviewing) {
    //     this.$store.state.teacherMarking.states.isMarking = false;
    //   }
    // },

    handleToggleMarkingMode() {
      this.resetState();
      this.$store.state.teacherMarking.states.isMain = true
    },

    // MODE: MODAL
    closeModalMode() {
      this.resetState()
      this.$store.state.teacherMarking.states.isMain = true;
    },

    // MODE: STICKER
    handleToggleStickerBar() {
      this.toggleStickerBar()
    },
    handleLoadSticker(stickerName) {
      this.nowLoadingSticker = stickerName;
      this.toggleStickerBar();
    },
    handleLoadTextBar() {
      this.nowLoadingTextBar = !this.nowLoadingTextBar;
    },

    toggleStickerBar() {
      let value = !this.$store.state.teacherMarking.states.isSelectingSticker;
      this.resetState();
      this.$store.state.teacherMarking.states.isMarking = true;
      this.$store.state.teacherMarking.states.isSelectingSticker = value;
    },

    handleSaveEditedSnappedAnswer() {
      this.resetState();
      this.$store.state.teacherMarking.states.isMain = true
      this.$store.state.teacherMarking.states.isSavingEditedSnappedAnswer = true;
    },

    handleEditedSnappedAnswer(marked) {
      this.assignmentDetails.snappedAnswerPaths[marked.index] = marked.dataURL;
      router.push({name: 'teacher.assignments.marking.details'});
    },

    // SUBMISSION DETAILS
    // fetchData() {
    //
    //   SubmissionRepository.find(this.submissionID)
    //       .then(response => {
    //
    //
    //         let data = response.data.submission_details;
    //
    //         this.assignmentDetails.submissionID = data.submission_id;
    //         this.assignmentDetails.studentID = data.student_id;
    //         this.assignmentDetails.studentName = data.student_name;
    //         this.assignmentDetails.assignmentID = data.assignment_id;
    //         this.assignmentDetails.assignmentTitle = data.assignment_title;
    //         this.assignmentDetails.writtenAnswer = data.written_answer;
    //         this.assignmentDetails.createdAt = data.created_at;
    //         this.assignmentDetails.updatedAt = data.updated_at;
    //         this.assignmentDetails.submittedTime = data.submission_time;
    //         this.assignmentDetails.submittedDate = data.submission_date;
    //         this.assignmentDetails.marksID = data.marks_id;
    //         this.assignmentDetails.marks = data.marks;
    //
    //         if (data.snap_answer) {
    //           this.submission.type = 'snapped';
    //           this.assignmentDetails.snappedAnswerPaths = data.snap_answer_data_url.split('|');
    //         }
    //
    //         if (data.written_answer) {
    //           this.submission.type = 'written';
    //         }
    //
    //         if (data.marking_picture_url) {
    //           this.assignmentDetails.markedSnappedAnswerPaths = data.marking_picture_url.split(',');
    //         }
    //
    //         this.$store.state.teacherMarking.states.isLoading = false;
    //
    //       });
    // },


    submit() {
      if (this.submission.marks === null || this.submission.marks === undefined) {
        this.resetState()
        this.$store.state.teacherMarking.states.isMain = true;
        this.$store.state.teacherMarking.states.isShowingModal = true;
      } else {

        MarksRepository.store(
            {
              assignmentID: this.assignmentDetails.assignmentID,
              studentID: this.assignmentDetails.studentID,
              answerID: this.assignmentDetails.submissionID,
              submissionType: this.submission.type,
              snappedAnswers: this.assignmentDetails.snappedAnswerPaths,
              marks: this.submission.marks,
              feedback: this.submission.feedback
            })
            .then(response => {

              let content = response.data;

              let type = content.messageType;
              let message = content.message;

              if (type === 'success') {
                this.fetchData();
              }

            })
      }
    },
    resetState() {
      this.$store.state.teacherMarking.states.isLoading = false;
      this.$store.state.teacherMarking.states.isMain = false;
      this.$store.state.teacherMarking.states.isPreviewing = false;
      this.$store.state.teacherMarking.states.isMarking = false;
      this.$store.state.teacherMarking.states.isSelectingSticker = false;
      this.$store.state.teacherMarking.states.isWritingFeedback = false;
      this.$store.state.teacherMarking.states.isShowingModal = false
      this.$store.state.teacherMarking.states.isSavingEditedSnappedAnswer = false;
    }
  },
  mounted() {
    this.$store.dispatch('teacherMarking/fetchData', this.submissionID)
    // this.$store.dispatch('teacherMarking/test')

  },
  components: {Modal, BottomBar, ExpandImageIcon, ArrowBackIcon, IconBaseTwo, NavBack, PageHeaderThree},

}
</script>

<style scoped>

</style>
