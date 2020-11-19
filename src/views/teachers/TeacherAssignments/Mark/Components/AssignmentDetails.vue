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
              @isMarking="enterMarkingMode"
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
    enterMarkingMode(value) {
      this.isPreviewing = false;
      this.isMarking.status = value.state;
      this.isMarking.path = value.path

      setTimeout(() => {
        this.loadCanvas();
        this.loadSnappedAnswer();
      }, 100)
    },
    loadCanvas() {

      this.canvasVue = new fabric.Canvas('canvas', {
        width: this.canvasDimensions.width,
        height: this.canvasDimensions.height,
      })
    },
    loadSnappedAnswer() {


      this.isMarking.path = 'https://snapped-dev.boneybone.com/storage/assignments/20977d8890de5201aa4f113918a54132bf4.jpg';

      // Load image, then set it is Canvas's background image
      fabric.Image.fromURL(this.isMarking.path, (img, error) => {

            let scaleFactor = this.canvasDimensions.width / img.width;
            //
            // console.log(`Scale factor: ${scaleFactor}`)
            // console.log(`Path: ${this.isMarking.path}`)
            // console.log(`Canvas: ${this.canvasVue} | Height: ${this.canvasVue.height}`)

            // this.canvasVue.setBackgroundImage(
            //     this.isMarking.path,
            //     this.canvasVue.renderAll.bind(this.canvasVue),
            //     {
            //       top: this.canvasVue.height / 2,
            //       left: this.canvasVue.width / 2,
            //       originX: 'center',
            //       originY: 'center',
            //       scaleX: scaleFactor,
            //       scaleY: scaleFactor
            //     }
            // );
          }, {
            crossOrigin: 'Anonymous'
          }
      );

    },
    loadSticker(stickerName) {

      console.log(`Jom load ${stickerName}`)
      this.isSelectingSticker = false;

      fabric.loadSVGFromString(stickers[stickerName], (objects, options) => {

        let obj = fabric.util.groupSVGElements(objects, options);
        obj.scaleToHeight(this.canvasVue.height / 12)
            .set({left: this.canvasVue.width / 2, top: this.canvasVue.height / 2})
            .setCoords();

        this.canvasVue.add(obj).renderAll();
      });
    },

    doneMarkingSnappedAnswer: function () {
      let dataURL = this.canvasVue.toDataURL();
    }

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
