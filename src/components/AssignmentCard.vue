<template>
  <router-link :to="route"
               class="max-w-sm rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-3 pt-5 pb-3 mb-3">

    <div class="flex flex-row justify-between mb-4">
      <div class="text-left text-purple-primary text-xs-plus truncate  pr-10">
        {{ assignment.title }}
      </div>
      <div class="w-1/4 text-right font-bold text-green-primary text-px-12">
        <slot name="topRightAction"/>
      </div>
    </div>

    <text-multiline-truncate :lines="descriptionLines"
        class="text-left text-purple-primary text-px-10 pr-10 mb-4">
      {{ assignment.description }}
    </text-multiline-truncate>

    <div class="flex flex-row items-baseline">

      <div class="flex flex-row w-3/4 text-left text-px-10 text-purple-secondary">
        <div class="w-1/4 truncate"> {{ assignment.subjectName }}</div>
        <div class="w-1/4  truncate mx-1"> {{ assignment.classroomName }}</div>
        <div class="w-2/4"> {{ getHumanDate(assignment.dueDatetime) }}</div>
      </div>

      <div class="w-1/4">
        <countdown-timer :due-date-time="assignment.dueDatetime"
                         :has-twenty-four-hour-limit="true"
                         :has-clock-icon="true"
                         class="text-xs bg-purple-primary"
        />
      </div>
    </div>

  </router-link>
</template>

<script>
import moment from "moment";
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import CountdownTimer from "@/components/CountdownTimer";

export default {
  name: "AssignmentCard",
  components: {CountdownTimer, TextMultilineTruncate},
  props: {
    route: {
      type: Object,
      required: true
    },
    descriptionLines: {
      type: Number,
      default: 2
    },
    assignment: Object
  },
  methods: {
    getHumanDate(datetime) {
      return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
    },
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    }
  },
  mounted() {
    this.startTimer()
  }
}
</script>

<style scoped>

</style>
