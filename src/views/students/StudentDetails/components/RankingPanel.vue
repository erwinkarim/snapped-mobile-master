<template>
  <div class="flex flex-row items-baseline justify-between">
    <div class="flex flex-col w-1/3 items-center" >
      <circle-progress-bar
          :display-value="rankings.today ? rankings.today.toString() : ''" :completed-steps="rankings.today" :total-steps="totalNumOfStudents"
          start-color="green" stroke-linecap="butt" :diameter="65"
          inner-stroke-color="gray" :stroke-width="6" :inner-stroke-width="6"
      />
      <div class="mt-1 text-purple-secondary text-2xs">
        Today Rank
      </div>
    </div>
    <div class="flex flex-col w-1/3 items-center">
      <circle-progress-bar
          :display-value="rankings.weekly ? rankings.weekly.toString() : ''" :diameter="65" :completed-steps="rankings.weekly" :total-steps="totalNumOfStudents"
          start-color="red" stroke-linecap="butt"
          inner-stroke-color="#F1F3F6" :stroke-width="6" :inner-stroke-width="6"
      />
      <div class="mt-1 text-purple-secondary text-2xs">
        Weekly Rank
      </div>
    </div>
    <div class="flex flex-col w-1/3 items-center">
      <circle-progress-bar
          :display-value="rankings.overall ? rankings.overall.toString() : ''" :diameter="65" :completed-steps="rankings.overall" :total-steps="totalNumOfStudents"
          start-color="purple" stroke-linecap="butt"
          inner-stroke-color="#F1F3F6" :stroke-width="6" :inner-stroke-width="6"
      />
      <div class="mt-1 text-purple-secondary text-2xs">
        Overall Rank
      </div>
    </div>
  </div>

</template>

<script>
import CircleProgressBar from "@/components/CircleProgressBar";
import StudentRepository from "@/repositories/StudentRepository";

export default {
  name: "RankingPanel",
  data() {
    return {
      rankings: 0,
      totalNumOfStudents: 0
    }
  },
  created() {
    this.getRouteParams()
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
  },
  methods: {
    fetchData() {

      StudentRepository.getRanking(this.studentID)
          .then(response => {

            let data = response.data;

            this.rankings = {
              today: data.ranking.today,
              weekly: data.ranking.weekly,
              overall: data.ranking.overall,
            }

            this.totalNumOfStudents = data.total_students;

          })
          .catch(err => {

          })

    },
    getRouteParams() {
      this.studentID = this.$route.params.studentID
    }
  },
  components: {CircleProgressBar}
}
</script>

<style scoped>

</style>
