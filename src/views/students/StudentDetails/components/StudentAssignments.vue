<template>
  <div class="px-5">
    <div :key="assignment.id" v-for="assignment in assignments"
         class="mb-3 max-w-sm h-28 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-row px-3 pt-5 pb-3">

      <div class="">
        <assignment-score-circle
            :display-value="assignment.marks" :diameter="70" :score="parseInt(assignment.marks)" :total-score="100"
            start-color="purple" stroke-linecap="butt"
            inner-stroke-color="#F1F3F6" :stroke-width="6" :inner-stroke-width="6"
        />
      </div>

      <div class="flex flex-col w-9/12 justify-between">
        <div>
          <div class="text-left text-purple-primary text-xs-plus"> {{ assignment.title }}</div>

          <div class="text-left text-purple-primary text-px-10"> {{ assignment.written_description }}</div>

        </div>

        <div class="flex flex-row w-full text-left text-px-10 text-purple-secondary">
          <div class="w-1/4"> {{ assignment.subject_name }}</div>
          <div class="w-2/4"> {{ getHumanDate(assignment.due_datetime) }}</div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";
import StudentRepository from "@/repositories/StudentRepository";
import moment from "moment";
import CircleProgressBar from "@/components/CircleProgressBar";
import AssignmentScoreCircle from "@/views/students/StudentDetails/components/AssignmentScoreCircle";

export default {
  name: "StudentAssignments",
  components: {AssignmentScoreCircle, CircleProgressBar},
  props: {
    studentID:  [String, Number],
  },
  data() {
    return {
      // states
      error: null,
      loading: false,
      awaitingSearch: false,

      // data
      assignments: [],
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
  },
  methods: {

    fetchData() {
      this.error = this.assignments = null
      this.loading = true

      StudentRepository.getMarkedAssignments(this.studentID)
          .then(response => {
            this.assignments = response.data.data
            this.loading = false

            console.log(this.assignments)
          })
          .catch(err => {
            console.log(err)
          })
    },
    getHumanDate(datetime) {
      return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
    }
  }
}
</script>

<style scoped>

</style>
