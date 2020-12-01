<template>
  <div class="px-8 mt-8">
    <div class="bg-gray-secondary rounded-2xl text-left py-8 px-6">
      <!-- TITLE -->
      <div class="font-semibold text-2xl text-purple-primary">
        {{ assignment.title }}
      </div>

      <!-- DETAILS -->
      <div class="flex flex-row  text-xs-plus text-purple-secondary mt-2 justify-between">
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
        <div v-if="assignment.written_question.title"
             class="mb-2 truncate"
        >
          {{ assignment.written_question.title }}
        </div>
        <text-multiline-truncate v-if="assignment.written_question.description"
                                 :lines="7"
        >
          {{ assignment.written_question.description }}
        </text-multiline-truncate>
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
  computed: {
    hasWrittenQuestion: function () {
      return this.assignment.written_question.title !== null || this.assignment.written_question.description !== null;
    },

    hasSnappedQuestion: function () {
      return this.assignment.snap_question_paths !== undefined && this.assignment.snap_question_paths.length > 0;
    },
  },
  methods: {
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
