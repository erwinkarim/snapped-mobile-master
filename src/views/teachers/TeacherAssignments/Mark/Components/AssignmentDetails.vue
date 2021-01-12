<template>
    <div class="flex flex-col w-screen md:max-w-xl mx-auto ">

      <!-- CONTENT -->
      <div :class="contentClass" class="relative top-24">

        <!--  ASSIGNMENT ANSWERS-->

        <div :class="imagePreviewClass" class="pt-4 z-10">

          <answer-preview-swiper v-if="$store.getters['teacherMarking/hasSnappedAnswer']" />

          <written-answer-preview  v-if="$store.getters['teacherMarking/hasWrittenAnswer'] && !$store.state.teacherMarking.states.isMarking" />
        </div>

        <!-- ASSIGNMENT DETAILS -->
        <assignment-info v-if="$store.getters['teacherMarking/isMainPage']" :details="$store.state.teacherMarking.assignmentDetails" />
      </div>

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
import TickedBoxIcon from "@/components/icons/TickedBoxIcon";
import StickerLoader from "@/views/teachers/TeacherAssignments/Mark/Components/StickerLoader";
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import WrittenAnswerPreview from "@/views/teachers/TeacherAssignments/Mark/Components/WrittenAnswerPreview";
import AssignmentInfo from "@/views/teachers/TeacherAssignments/Mark/Components/AssignmentInfo";

export default {
  name: "AssignmentDetails",
  props: {
    submissionID: [String, Number],
    newMarks: [String, Number],
  },
  computed: {

    containerClass: function () {
      let value = 'bg-white';

      if (this.$store.state.teacherMarking.states.isMarking) {
        value = 'bg-black-primary';
      }

      return value;
    },

    contentClass: function () {
      if (this.$store.state.teacherMarking.states.isMarking) {
        return 'pb-16/9';
      }

      return '';
    },

    imagePreviewClass: function () {
      if (this.$store.state.teacherMarking.states.isPreviewing) {
        return 'bg-white px-6 pb-16';
      } else {
        return 'bg-black-primary px-16  pb-10'
      }
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
