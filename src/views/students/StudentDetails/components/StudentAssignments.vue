<template>
  <div class="px-5 md:mt-4">
    <router-link v-for="assignment in assignments"
                 :key="assignment.id"
                 :to="{name: 'teacher.assignments.show', params: { assignmentID: assignment.id }}"
         class="mb-3 max-w-sm md:max-w-xl md:w-3/4 md:mx-auto rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-row px-3 pt-5 pb-3">

      <div class="">
        <assignment-score-circle
            :display-value="assignment.marks" :diameter="70" :score="parseInt(assignment.marks)" :total-score="100"
            start-color="purple" stroke-linecap="butt"
            inner-stroke-color="#F1F3F6" :stroke-width="6" :inner-stroke-width="6"
        />
      </div>

      <div class="flex flex-col w-9/12 justify-between">
        <div>
          <div class="text-left text-purple-primary text-xs-plus  truncate  pr-10"> {{ assignment.title }}</div>

          <div class="text-left text-purple-primary text-px-10  truncate mt-2 pr-10"> {{ assignment.written_description }}</div>

        </div>

        <div class="flex flex-row w-full text-left text-px-10 text-purple-secondary justify-between">
          <div class="w-1/2 truncate mr-2"> {{ assignment.subject_name }}</div>
          <div class="w-1/2"> {{ getHumanDate(assignment.due_datetime) }}</div>
        </div>
      </div>


    </router-link>
  </div>
</template>

<script>
import TeacherRepository from "@/repositories/TeacherRepository";
import StudentRepository from "@/repositories/StudentRepository";
import moment from "moment";
import CircleProgressBar from "@/components/CircleProgressBar";
import AssignmentScoreCircle from "@/views/students/StudentDetails/components/AssignmentScoreCircle";
import router from "@/router";

export default {
  name: "StudentAssignments",
  components: {AssignmentScoreCircle, CircleProgressBar},
  props: {
    userRole: String,
    isAuthStudent:Boolean,
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

          })
    },
    getHumanDate(datetime) {
      return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
    }
  },
  mounted() {
    this.fetchData()
  },
  created() {
    if (this.userRole !== 'Teacher' && !this.isAuthStudent ) {
      router.push({name:'student.profile.show'})
    }
  }
}
</script>

<style scoped>

</style>
