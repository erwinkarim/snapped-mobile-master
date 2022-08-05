<template>
  <div class="px-7 bg-white py-8 rounded-xl text-sm text-left">

    <div class="" v-if="$store.state.teacherMarking.states.isPreviewing">
      {{$store.state.teacherMarking.assignmentDetails.writtenAnswer}}
    </div>

    <text-multiline-truncate v-else :lines="14">
      {{$store.state.teacherMarking.assignmentDetails.writtenAnswer}}
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
