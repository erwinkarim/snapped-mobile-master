<template>
  <div class="px-8 mt-8">
    <div class="bg-gray-secondary rounded-2xl text-left py-8 px-6">
      <!-- TITLE -->
      <text-multiline-truncate :lines="2"
                               class="font-semibold text-2xl text-purple-primary "
      >
        {{ assignment.title }}
      </text-multiline-truncate>

      <!-- DETAILS -->
      <div class="flex flex-row  text-xs-plus text-purple-secondary mt-4 justify-between">
        <div class="pr-1 truncate w-1/3">
          {{ meta.subjectName || '' }}
        </div>
        <div class="px-1 truncate w-1/3">
          {{ meta.classroomName || '' }}
        </div>
        <div class="px-1 truncate w-2/5">
          {{ getHumanDate(assignment.createdAt) }}
        </div>
      </div>

      <!-- Written Question -->
      <div v-if="hasWrittenQuestion"
           class="mt-8 text-purple-primary text-xs-plus flex flex-col"
      >

        <!-- WRITTEN QUESTION TITLE -->
        <div v-if="assignment.written_question.title"
             class="mb-2 truncate"
        >
          {{ assignment.written_question.title }}
        </div>

        <!-- WRITTEN QUESTION DESCRIPTION -->
        <div v-if="assignment.written_question.description"
            id="test"
        >
          <div v-if="isReadingMore"
               class="leading-relaxed"
          >
            {{ assignment.written_question.description }}
          </div>
          <text-multiline-truncate v-else :lines="7" >
            {{ assignment.written_question.description }}
          </text-multiline-truncate>
        </div>

        <!-- WRITTEN QUESTION READ MORE BUTTON -->
        <button v-if="assignment.written_question.description && hasReadMore"
                @click="toggleReadMore"
                class="mt-6 md:max-w-sm w-1/3 md:w-1/5 flex flex-row items-center text-red-primary focus:outline-none text-left"
        >
          <span class="w-6/7 font-bold">
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
      </div>

      <!-- Snapped Question -->
      <div v-if="hasSnappedQuestion" class="mt-8 text-purple-primary text-xs-plus flex flex-col">
        <question-preview-swiper
            :snapped-answer-paths="assignment.snap_question_paths"
        />
      </div>


    </div>
  </div>
</template>

<script>
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import QuestionPreviewSwiper from "@/views/teachers/TeacherAssignments/Show/Components/QuestionPreviewSwiper";
import moment from "moment";

export default {
  name: "AssignmentQuestionCard",
  props: {
    assignment: Object,
    meta: Object,
  },
  data() {
    return {
      // States
      isReadingMore: false,
    }
  },
  computed: {
    hasWrittenQuestion: function () {
      return this.assignment.written_question.title !== null || this.assignment.written_question.description !== null;
    },

    hasSnappedQuestion: function () {
      return this.assignment.snap_question_paths !== undefined && this.assignment.snap_question_paths.length > 0;
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
    }
  },
  methods: {
    toggleReadMore() {
      this.isReadingMore = !this.isReadingMore;
    },
    getHumanDate(datetime) {

      if (datetime) {
        return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
      } else {
        return ''
      }

    }
  },
  components: {QuestionPreviewSwiper, TextMultilineTruncate}
}
</script>

<style scoped>

</style>
