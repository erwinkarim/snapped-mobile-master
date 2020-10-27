<template>
  <div>
    <!-- TOTAL SUBMISSIONS -->
    <div class="w-full mt-8 text-left ">
      <div class="flex flex-row justify-between mb-2 items-center">
        <div class="flex flex-row items-center">
          <div class="bg-blue-500 rounded-full w-3 h-3 mr-3"/>
          <div class="text-purple-secondary text-xs">
            Total assignments submission
          </div>

        </div>
        <div class="text-purple-primary text-sm font-bold">
          {{ assignmentSubmission.percentage || 0 }} %
        </div>
      </div>
      <div class="w-full bg-gray-secondary rounded-full">
        <div :style="assignmentPercentage" class="text-xs leading-none h-3 text-center rounded-full"></div>
      </div>
    </div>

    <!-- SUBMISSION PERFORMANCE -->
    <div class="flex flex-row mt-6 w-full">
      <div class="flex w-1/3 flex-col text-center">
        <div class="font-bold text-purple-primary text-3xl"> {{ assignmentSubmission.total_today || 0 }}</div>
        <div class="text-xs"> Today</div>
      </div>

      <div class="flex w-1/3 flex-col text-center">
        <div class="font-bold text-purple-primary text-3xl"> {{ assignmentSubmission.total_weekly || 0 }}</div>
        <div class="text-xs"> Weekly</div>
      </div>

      <div class="flex w-1/3 flex-col text-center">
        <div class="font-bold text-purple-primary text-3xl"> {{ assignmentSubmission.total_overall || 0 }}</div>
        <div class="text-xs"> Overall</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "AssignmentSubmissionPanel",
  props: {
    assignmentSubmission : Object
  },
  computed: {
    assignmentPercentage () {
      return {
        width: this.assignmentSubmission.percentage,
        "background-color": "#34ACE0"
      }
    }
  },
}
</script>

<style scoped>

</style>
