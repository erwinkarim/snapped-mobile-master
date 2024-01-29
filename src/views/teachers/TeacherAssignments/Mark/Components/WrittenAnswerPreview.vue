<template>
  <div class="px-7 bg-white py-8 rounded-xl text-sm text-left">

    <div class="my-2 text-lg">Student's Answer.</div>
    <div class="" v-if="$store.state.teacherMarking.states.isPreviewing">
      {{$store.state.teacherMarking.assignmentDetails.writtenAnswer}}
    </div>

    <div v-else>
      <text-multiline-truncate :lines="14">
        {{$store.state.teacherMarking.assignmentDetails.writtenAnswer}}
      </text-multiline-truncate>
    </div>

    <div class="my-2 text-lg">Marks</div>
    <div>{{ $store.state.teacherMarking.submission.marks }} / 100</div>

    <div class="my-2 text-lg">Feedback</div>
    <text-multiline-truncate :lines="14">
      {{$store.state.teacherMarking.submission.feedback}}
    </text-multiline-truncate>

  </div>
</template>

<script>
import TextMultilineTruncate from "@/components/TextMultilineTruncate";

export default {
  name: "WrittenAnswerPreview",
  components: {TextMultilineTruncate}
}
</script>

<style scoped>

</style>
