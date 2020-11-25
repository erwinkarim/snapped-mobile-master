<template>
  <div v-if="show" class="mt-6 px-5">

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
    <div v-else-if="hasNewMarks" class="flex flex-row font-bold text-xl mt-8 text-left tracking-wide">
      <div class="text-purple-secondary mr-1">
        {{ newMarks || '-' }}
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
</template>

<script>
export default {
  props: {
    show: Boolean,
    details: Object,
    newMarks: [String, Number]
  },
  computed: {
    hasNewMarks() {
      return this.newMarks !== null && this.newMarks !== undefined;
    },
    isMarked: function () {
      return this.details.marks !== null && this.details.marks !== undefined;
    },
  },
  name: "AssignmentInfo"
}
</script>

<style scoped>

</style>
