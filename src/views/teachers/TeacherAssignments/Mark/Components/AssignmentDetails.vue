<template>
    <div class="flex flex-col w-screen ">

      <!-- CONTENT -->
      <div :class="contentClass" class="relative top-24">

        <!--  ASSIGNMENT ANSWERS-->
        <div :class="imagePreviewClass" class="pt-4 z-10">
          <!--
                TODO: - Implement page editSnappedAnswer.  On preview click, go to the page with image path
                      - Allow loadCanvas, loadImage and loadSticker for demo purposes
          -->
          <answer-preview-swiper
              v-if="hasSnappedAnswer && !isMarking.status"
              :is-previewing="states.isPreviewing"
              :images="assignmentDetails.snappedAnswerPaths"
              @nowMarking="enterMarkingMode"
          />

          <written-answer-preview
              v-if="hasWrittenAnswer && !isMarking.status"
              :is-previewing="states.isPreviewing"
              :answer="assignmentDetails.writtenAnswer"
          />
        </div>

        <!-- ASSIGNMENT DETAILS -->
        <assignment-info
            :show="states.isMain"
            :details="assignmentDetails"
            :new-marks="newMarks"
        />
      </div>


        <!-- CANVAS -->
<!--      <div v-if="isMarking.status"-->
<!--           class="w-full h-full bg-black-primary object-cover top-0 flex flex-row justify-center items-center absolute">-->
<!--        <canvas id="canvas"/>-->
<!--      </div>-->
    </div>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import DialogBubbleIcon from "@/components/icons/DialogBubbleIcon";
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import ExpandImageIcon from "@/components/icons/ExpandImageIcon";
import PageTitle from "@/components/PageTitle";
import AnswerPreviewSwiper from "@/views/teachers/TeacherAssignments/Mark/Components/AnswerPreviewSwiper";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import SubmissionRepository from "@/repositories/SubmissionRepository";
import TickedBoxIcon from "@/components/icons/TickedBoxIcon";
import StickerLoader from "@/views/teachers/TeacherAssignments/Mark/Components/StickerLoader";
import {fabric} from "fabric";
import stickers from "@/components/Stickers/Stickers";
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import WrittenAnswerPreview from "@/views/teachers/TeacherAssignments/Mark/Components/WrittenAnswerPreview";
import AssignmentInfo from "@/views/teachers/TeacherAssignments/Mark/Components/AssignmentInfo";

export default {
  name: "AssignmentDetails",
  props: {
    submissionID: [String, Number],
    newMarks: [String, Number],
    states: Object,
    assignmentDetails: Object
  },
  data() {
    return {
      // Marking Mode: Canvas
      canvasDimensions: {
        height: 0.75 * screen.height,
        width: screen.width
      },

      isMarking: {
        status: false,
        path: null
      },

    }
  },
  computed: {

    containerClass: function () {
      let value = 'bg-white';

      if (this.isMarking.status) {
        value = 'bg-black-primary';
      }

      return value;
    },

    contentClass: function () {
      if (this.states.isMarking) {
        return 'pb-16/9';
      }

      return '';
    },

    imagePreviewClass: function () {
      if (this.states.isPreviewing) {
        return 'bg-white px-6 pb-16';
      } else {
        return 'bg-black-primary px-16  pb-10'
      }
    },

    hasWrittenAnswer: function () {
      return this.assignmentDetails.writtenAnswer !== null && this.assignmentDetails.writtenAnswer !== undefined;
    },

    hasSnappedAnswer: function () {
      return this.assignmentDetails.snappedAnswerPaths !== null && this.assignmentDetails.snappedAnswerPaths !== undefined;
    },
  },
  methods: {
    enterMarkingMode(path) {
      this.$emit('nowMarking', path)
    },
  },
  components: {
    AssignmentInfo,
    WrittenAnswerPreview,
    TextMultilineTruncate,
    StickerLoader,
    TickedBoxIcon,
    PageHeaderThree,
    DashboardLayout,
    ArrowBackIcon,
    AnswerPreviewSwiper,
    PageTitle,
    ExpandImageIcon, NavBack, PageTitleTwo, DialogBubbleIcon, IconBaseTwo
  }
}
</script>

<style scoped>

</style>
