<template>
  <div :class="containerClass" class="h-screen">

    <!-- SCREEN OVERLAY -->
    <div v-if="isSelectingSticker" @click="toggleStickerBar"
         class="fixed h-screen z-50 inset-x-0 block top-0 bg-filter-blue bg-opacity-40 ">
    </div>

    <!-- HEADER -->
    <page-header-three :background-color="headerBackgroundColor" :bottom-padding="4">
      <template v-slot:leftAction>
        <nav-back v-if="!isPreviewing" class="w-2/3" stroke-color="white"/>

        <div @click="togglePreviewMode">
          <icon-base-two v-if="isPreviewing || isMarking.status" class="w-2/3">
            <arrow-back-icon :stroke-color="isPreviewing ? 'purple-primary' : 'white'"/>
          </icon-base-two>
        </div>
      </template>
      <template v-slot:title v-if="isPreviewing">
        Answer Preview
      </template>
      <template v-slot:rightAction v-if="!isPreviewing && !isMarking.status">
        <div @click="togglePreviewMode" class="flex flex-row justify-end">
          <icon-base-two class="w-1/3">
            <expand-image-icon/>
          </icon-base-two>
        </div>
      </template>
    </page-header-three>

    <div class="flex flex-col w-screen ">

      <!-- Content -->
      <div :class="contentClass" class="relative top-24">

        <!--  ASSIGNMENT ANSWERS (IMAGE) -->
        <div v-if="hasSnappedAnswer && !isMarking.status" :class="imagePreviewClass" class="pt-4 z-10">
          <answer-preview-swiper
              :is-previewing="isPreviewing"
              :images="details.snappedAnswerPaths"
              @isMarking="enterMarkingMode"
          />
        </div>

        <!-- ASSIGNMENT DETAILS -->
        <div v-if="!isPreviewing && !isMarking.status" class="mt-6 px-5">

          <!-- Achievements -->
          <div class="flex flex-row ">
            <div class="bg-gray-secondary rounded-full py-1 px-4 text-xs font-bold text-purple-primary uppercase">
              First Submit
            </div>
          </div>

          <div class="text-left mt-5 text-purple-primary font-bold tracking-normal text-xl truncate">
            {{ details.assignmentTitle || '' }}
          </div>

          <div class="text-purple-secondary font-bold text-sm mt-3 text-left truncate">
            {{ details.studentName || '' }}
          </div>

          <div class="flex flex-row justify-between mt-4 text-sm ">
            <div class="text-purple-secondary text-left">
              Time submitted
            </div>
            <div class="flex flex-row justify-end text-purple-primary text-right">
              <div class="mr-4">
                {{ details.submittedTime || '' }}
              </div>
              <div>
                {{ details.submittedDate || '-' }}
              </div>
            </div>
          </div>

          <!-- MARKS -->
          <div v-if="isMarked" class="flex flex-row font-bold text-xl mt-8 text-left tracking-wide">
            <div class="text-purple-secondary mr-1">
              {{ details.marks || '-' }}
            </div>
            <div class="text-purple-primary">
              /100 Marks
            </div>
          </div>
          <div v-else class="flex flex-row font-bold text-xl mt-8 text-left tracking-wide">
            <div class="text-purple-primary">
              Unmarked
            </div>
          </div>

        </div>

      </div>

      <div v-if="isMarking.status"
           class="w-full h-full bg-black-primary object-cover top-0 flex flex-row justify-center items-center absolute">
        <canvas id="canvas"/>
      </div>

    </div>


    <!-- BOTTOM BAR -->

    <div class="md:hidden block fixed inset-x-0 bottom-0 z-60 shadow pt-4 pb-6 px-5">

      <div v-if="!isLoading" class="w-full">
        <div v-if="isMarked" class="w-full flex flex-row">
          <div
              class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
            Marked
          </div>
        </div>
        <div v-else-if="isMarking.status" class="z-60">

          <div v-if="isSelectingSticker"
               class="fixed inset-x-0 z-60 bg-white block bottom-0 h-3/5 rounded-t-2xl shadow-xl">
            <button @click="toggleStickerBar" class="bg-gray-primary h-2 w-1/5 rounded-full mt-3"></button>
            <sticker-loader v-on:selected-sticker="loadSticker" class="mt-5"/>
          </div>
          <div v-else class="flex flex-row h-full items-center justify-around">
            <div class="w-full flex flex-row">
              <div class="w-1/3 px-1">
                <button @click="toggleStickerBar"
                        class="w-full font-bold rounded-full text-white text-sm bg-transparent border-1 border-white py-3 px-1 flex flex-row justify-center">
                  <div class="w-5/7">
                    Markers
                  </div>
                  <icon-base-two class="w-1/7">
                    <ticked-box-icon/>
                  </icon-base-two>
                </button>
              </div>
              <div class="w-1/3 px-1">
                <button
                    class="w-full font-bold rounded-full text-white text-sm bg-transparent border-1 border-white py-3 px-1 flex flex-row justify-center">
                  <div class="w-5/7">
                    Text
                  </div>
                </button>
              </div>
              <div class="w-1/3 px-1">
                <button @click="doneMarkingSnappedAnswer"
                        class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
                  <div class="w-5/7">
                    Done
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full flex flex-row items-center">
          <router-link :to="{name: 'teacher.assignments.marking.feedback'}" class="w-1/8 mr-2">
            <icon-base-two class="w-7/8">
              <dialog-bubble-icon/>
            </icon-base-two>
          </router-link>
          <div class="w-3/8 px-2">
            <router-link :to="{name: 'teacher.assignments.marking.add_mark'}" v-if="isPreviewing"
                         class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary">
              Add Mark
            </router-link>
            <button v-else @click="togglePreviewMode"
                    class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center hover:text-white hover:bg-purple-primary">
              Marking
            </button>
          </div>
          <div class="w-4/8 px-2">
            <button
                class="w-full font-bold bg-yellow-primary rounded-full text-purple-primary text-sm py-3 px-1 flex flex-row justify-center">
              <div class="w-5/7">
                Set as Marked
              </div>
            </button>
          </div>
        </div>
      </div>
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
import AssignmentRepository from "@/repositories/AssignmentRepository";
import SubmissionRepository from "@/repositories/SubmissionRepository";
import TickedBoxIcon from "@/components/icons/TickedBoxIcon";
import StickerLoader from "@/views/teachers/TeacherAssignments/Mark/Components/StickerLoader";
import {fabric} from "fabric";
import stickers from "@/components/Stickers/Stickers";

export default {
  name: "AssignmentDetails",
  props: {
    submissionID: [String, Number]
  },
  data() {
    return {

      // States
      isLoading: true,
      isPreviewing: false,
      isSelectingSticker: false,

      //
      details: {
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

      console.log(this.isMarking.status)

      let value = 'bg-white';

      if (this.isMarking.status) {
        value = 'bg-black-primary';
      }

      return value;
    },

    contentClass: function () {
      let value = '';

      if (this.isMarking.status) {
        return 'pb-16/9';
      }
    },

    imagePreviewClass: function () {
      if (this.isPreviewing) {
        return 'bg-white px-6 pb-16';
      } else {
        return 'bg-black-primary px-16  pb-10'
      }
    },

    headerBackgroundColor: function () {
      let value = 'bg-black-primary';
      if (this.isPreviewing) {
        value = 'bg-white'
      }

      if (this.isSelectingSticker) {
        value = 'bg-black-primary'
      }

      return value;
    },

    isMarked: function () {
      return this.details.marks !== null;
    },

    hasSnappedAnswer: function () {
      return this.details.snappedAnswerPaths !== null && this.details.snappedAnswerPaths !== undefined;
    },
  },
  methods: {
    fetchData() {

      SubmissionRepository.find(this.submissionID)
          .then(response => {
            let data = response.data.submission_details;

            this.details.submissionID = data.submission_id;
            this.details.submissionID = data.submission_id;
            this.details.studentID = data.student_id;
            this.details.studentName = data.student_name;
            this.details.assignmentID = data.assignment_id;
            this.details.assignmentTitle = data.assignment_title;
            this.details.writtenAnswer = data.written_answer;
            this.details.snappedAnswerPaths = data.snap_answer_url.split(',');
            this.details.createdAt = data.created_at;
            this.details.updatedAt = data.updated_at;
            this.details.submittedTime = data.submission_time;
            this.details.submittedDate = data.submission_date;
            this.details.marks = data.marks;

            this.isLoading = false;
          });
    },
    togglePreviewMode() {
      this.isPreviewing = !this.isPreviewing;

      if (this.isPreviewing) {
        this.isMarking.status = false;
        this.isMarking.path = null
      }

    },
    toggleStickerBar() {
      this.isSelectingSticker = !this.isSelectingSticker;
    },

    enterMarkingMode(value) {
      this.isPreviewing = false;
      this.isMarking.status = value.state;
      this.isMarking.path = value.path

      setTimeout(() => {
        this.loadCanvas();
        this.loadSnappedAnswer();
      }, 100)

      console.log(`Enter marking mode | Preview: ${this.isPreviewing} | Marking: ${this.isMarking.status}`)
    },
    loadCanvas() {

      this.canvasVue = new fabric.Canvas('canvas', {
        width: this.canvasDimensions.width,
        height: this.canvasDimensions.height,
      })
    },
    loadSnappedAnswer() {

      /* TODO:
          - Implement load snapped answer
          - Implement navback and Done when isMarking
      */

      // Load image, then set it is Canvas's background image
      fabric.Image.fromURL(this.isMarking.path, (img, error) => {

            let scaleFactor = this.canvasDimensions.width / img.width;

            console.log(`Scale factor: ${scaleFactor}`)
            console.log(`Path: ${this.isMarking.path}`)
            console.log(`Canvas: ${this.canvasVue} | Height: ${this.canvasVue.height}`)

            this.canvasVue.setBackgroundImage(
                this.isMarking.path,
                this.canvasVue.renderAll.bind(this.canvasVue),
                {
                  top: this.canvasVue.height / 2,
                  left: this.canvasVue.width / 2,
                  originX: 'center',
                  originY: 'center',
                  scaleX: scaleFactor,
                  scaleY: scaleFactor
                }
            );
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
      console.log('Done Marking');
      console.log(`Done: ${this.isMarking.path}`);
      let dataURL = this.canvasVue.toDataURL()

      console.log(dataURL)
    }

  },
  mounted() {
    this.fetchData()
  },
  components: {
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
