<template>
  <router-link :to="{name: 'student.assignments.show', params: { assignmentID: assignment.assignmentID }}"

               class="max-w-sm h-30 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 pt-5 pb-3 mb-3">

    <!-- TODO: Refactor into assignment cards. Refer to submission cards -->

    <div class="text-left text-purple-primary text-xs-plus truncate  pr-10">{{ assignment.title }}</div>

    <div class="text-left text-purple-primary text-px-10 truncate pr-10">{{ assignment.description }}</div>

    <div class="flex flex-row">

      <div class="flex flex-row w-3/4 text-left text-px-10 text-purple-secondary">
        <div class="w-1/4 truncate"> {{ assignment.subjectName }}</div>
        <div class="w-1/4  truncate mx-1"> {{ assignment.classroomName }}</div>
        <div class="w-2/4"> {{ getHumanDate(assignment.dueDatetime) }}</div>
      </div>

      <div class="w-1/4 bg-purple-secondary rounded-full">

      </div>
    </div>

  </router-link>
</template>

<script>
import moment from "moment";

export default {
  name: "AssignmentCard",
  props: {
    assignment: Object
  },
  methods: {
    getHumanDate(datetime) {
      return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
    }
  }
}
</script>

<style scoped>

</style>
