<template>
  <div :class="isPreviewing ? '' : 'px-8'" class="mt-8">
    <div :class="isPreviewing ? 'bg-white' : 'bg-gray-secondary rounded-2xl text-left py-8 px-6'">

      <div v-if="!isPreviewing">
        <!-- TITLE -->
        <text-multiline-truncate :lines="2"
                                 class="text-2xl font-semibold text-purple-primary"
        >
          {{ assignment.title }}
        </text-multiline-truncate>

        <!-- DETAILS -->
        <div class="flex flex-row justify-between mt-4 text-xs-plus text-purple-secondary">
          <div class="pr-1 w-1/3 truncate">
            {{ meta.subjectName || '' }}
          </div>
          <div class="px-1 w-1/3 truncate">
            {{ meta.classroomName || '' }}
          </div>
          <div class="px-1 w-2/5 truncate">
            {{ getHumanDate(assignment.dueDatetime) }}
          </div>
        </div>
      </div>


      <!-- Written Question -->
      <div v-if="hasWrittenQuestion && !isPreviewing"
           class="flex flex-col mt-8 text-purple-primary text-xs-plus"
      >

        <!-- WRITTEN QUESTION TITLE -->
        <h2 v-if="assignment.written_question.title"
             class="mb-2"
        >
          {{ assignment.written_question.title }}
        </h2>

        <!-- WRITTEN QUESTION DESCRIPTION -->
        <div v-if="assignment.written_question.description" id="test" >
          <strong>Description: </strong><br />
          <VueMarkdown v-if="isReadingMore" class="leading-relaxed" >
            {{ assignment.written_question.description }}
          </VueMarkdown>
          <text-multiline-truncate v-else :lines="7">
            {{ assignment.written_question.description }}
          </text-multiline-truncate>
        </div>

        <!-- WRITTEN QUESTION READ MORE BUTTON -->
        <button v-if="assignment.written_question.description && hasReadMore"
                @click="toggleReadMore"
                class="flex flex-row items-center mt-6 w-1/3 text-left md:max-w-sm md:w-1/5 text-red-primary focus:outline-none"
        >
          <span class="font-bold w-6/7">
            {{ isReadingMore ? 'Read less' : 'Read more' }}
          </span>
          <div v-if="isReadingMore" class="w-1/7">
            <svg width="100%" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M1.14511 6L4.85516 2.28995L8.56521 6L9.71021 4.85504L4.85516 -4.24441e-07L0.000117402 4.85504L1.14511 6Z"
                  fill="#F53B57"/>
            </svg>

          </div>
          <div v-else class="w-1/7">
            <svg width="100%" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.56509 0L4.85504 3.71005L1.14499 0L0 1.14496L4.85504 6L9.71009 1.14496L8.56509 0Z"
                    fill="#F53B57"/>
            </svg>
          </div>
        </button>

        <!-- REMARKS -->
        <div class="flex flex-col mt-8 text-purple-primary text-xs-plus">
          <strong>Remarks: </strong><br />
          <VueMarkdown>
            {{ assignment.remarks }}
          </VueMarkdown>
        </div>
      </div>

      <!-- Snapped Question -->
      <div v-if="hasSnappedQuestion"
           :class="isPreviewing ? 'mb-20' : ''"
           class="flex flex-col mt-8 text-purple-primary text-xs-plus test"
      >
        <div v-if="!isPreviewing"
             class="flex z-30 flex-row justify-between items-center pt-4 pr-4 pb-2 md:py-4 rounded-t-2xl bg-black-primary"
        >
          <div class="pl-4 md:pl-5 w-3/4 text-xs md:text-lg text-white">
            {{ `Question ${swiperActiveSlideNumber} / ${swiperSlidesCount}` }}
          </div>
          <div class="flex flex-row justify-end" @click="togglePreview">
            <icon-base-two class="w-1/8 md:w-1/8" >
              <expand-image-icon stroke-color="white"/>
            </icon-base-two>
          </div>

        </div>
        <question-preview-swiper
            :class="isPreviewing ? 'h-full' : 'bg-black-primary  rounded-b-2xl pb-6 pt-3 overflow-hidden '"
            :is-previewing="isPreviewing"
            :snapped-answer-paths="assignment.snap_question_paths"
            v-on:swiperDetails="handleSwiperDetails"
        />
      </div>

      <!-- Zoom Question -->
      <div v-if="hasZoomQuestion"
           class="flex flex-col mt-8 text-purple-primary text-xs-plus mb-20"
      >
        <div v-if="!isPreviewing"
             class="flex z-30 flex-row justify-between items-center pt-4 pr-4 pb-2 md:py-4 rounded-t-2xl bg-black-primary"
        >
          <video autoplay controls height="640" width="854" crossorigin>
            <!-- must ensure all recordings are in mp4 format -->
            <source :src="assignment.recording_path" type="video/mp4" />
            Your browser don't support video tag.
          </video>
        </div>
        <div v-if="!isPreviewing">
          <p>If you unable to view the video, please try Google Chrome browser.</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import QuestionPreviewSwiper from "@/components/QuestionPreviewSwiper";
import moment from "moment";
import IconBaseTwo from "@/components/IconBaseTwo";
import ExpandImageIcon from "@/components/icons/ExpandImageIcon";
import VueMarkdown from 'vue-markdown';

export default {
  name: "AssignmentQuestionCard",
  props: {
    assignment: Object,
    meta: Object,
    isPreviewing: Boolean,
  },
  data() {
    return {
      // States
      isReadingMore: false,

      // Swiper slides
      swiperDetails: null

    }
  },
  computed: {
    hasWrittenQuestion: function () {
      return this.assignment.written_question.title !== null || this.assignment.written_question.description !== null;
    },

    hasSnappedQuestion: function () {
      return this.assignment.snap_question_paths !== undefined && this.assignment.snap_question_paths.length > 0;
    },

    hasZoomQuestion: function () {
      console.log('asking hasZoomQuestion');
      console.log('recording_path', this.assignment.recording_path);
      console.log('recording_path is not undefined', this.assignment.recording_path !== undefined);
      //console.log('recording_path.length', this.assignment.recording_path.length > 0);
      return this.assignment.recording_path !== undefined && this.assignment.recording_path.length > 0;
    },

    hasReadMore() {

      if (this.assignment.written_question.description !== null) {

        let screenWidth = window.innerWidth;
        let characterCount = this.assignment.written_question.description.length;

        if (screenWidth > 500) {
          return characterCount > 450;
        } else {
          return characterCount > 250;
        }

      }
      return false;
    },

    swiperActiveSlideNumber() {
      return this.swiperDetails ? this.swiperDetails.activeSlideIndex + 1 : '-';
    },

    swiperSlidesCount() {
      return this.swiperDetails ? this.swiperDetails.slidesCount : 0;
    },

  },
  methods: {
    handleSwiperDetails(data) {
      this.swiperDetails = data
      this.emitSwiperDetails()
    },
    toggleReadMore() {
      this.isReadingMore = !this.isReadingMore;
    },
    getHumanDate(datetime) {

      if (datetime) {
        return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
      } else {
        return ''
      }
    },
    togglePreview() {
      this.$emit('togglePreview')
    },
    emitSwiperDetails() {
      this.$emit('swiperDetails', this.swiperDetails)
    }
  },
  components: {ExpandImageIcon, IconBaseTwo, QuestionPreviewSwiper, TextMultilineTruncate, VueMarkdown }
}
</script>

<style scoped>

</style>
