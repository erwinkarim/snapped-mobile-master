<template>
  <router-link :to="route"
               class="max-w-sm rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-row px-3 pt-5 pb-3 mb-3">

    <div class="flex flex-col w-full">
      <div class="flex flex-row justify-between mb-4">
        <div class="text-left text-purple-primary text-xs-plus truncate  pr-10">
          {{ assignment.title }}
        </div>
        <div class="w-1/4 text-right font-bold text-green-primary text-px-12">
          <slot name="topRightAction"/>
        </div>
      </div>

      <div class="flex flex-row justify-between mb-4">
        <text-multiline-truncate
            :lines="descriptionLines"
            class="text-left text-purple-primary text-px-10 pr-10 mb-4"
        >
          {{ assignment.description }}
        </text-multiline-truncate>
      </div>


      <div class="flex flex-row items-baseline">

        <div :class="hasMarks ? 'w-full' : 'w-3/4'" class="flex flex-row text-left text-px-10 text-purple-secondary">
          <div class="w-1/4 truncate"> {{ assignment.subjectName }}</div>
          <div class="w-1/4  truncate mx-1"> {{ assignment.classroomName }}</div>
          <div class="w-2/4"> {{ getHumanDate(assignment.dueDatetime) }}</div>
        </div>

        <div class="w-1/4" v-if="!hasMarks">
          <countdown-timer :due-date-time="assignment.dueDatetime"
                           :has-twenty-four-hour-limit="true"
                           :has-clock-icon="true"
                           class="text-xs bg-purple-primary"
          />
        </div>
      </div>
    </div>


    <div v-if="showMarks && hasMarks" class="w-1/4 text-right flex flex-row justify-end items-center font-bold text-green-primary text-px-12">
      <circle-progress-bar
          :display-value="assignmentMarks" :diameter="65" :completed-steps="assignmentMarks" :total-steps="100"
          start-color="green" stroke-linecap="butt"
          inner-stroke-color="#F1F3F6" :stroke-width="6" :inner-stroke-width="6"
      />
    </div>

  </router-link>
</template>

<script>
import moment from "moment";
import TextMultilineTruncate from "@/components/TextMultilineTruncate";
import CountdownTimer from "@/components/CountdownTimer";
import CircleProgressBar from "@/components/CircleProgressBar";

export default {
  name: "AssignmentCard",
  components: {CircleProgressBar, CountdownTimer, TextMultilineTruncate},
  props: {
    route: {
      type: Object,
      required: true
    },
    descriptionLines: {
      type: Number,
      default: 2
    },
    assignment: Object,
    showMarks:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasMarks() {
      return this.assignment.marks !== null && this.assignment.marks !== undefined;
    },
    assignmentMarks() {
      return parseInt(this.assignment.marks.value);
    }
  },
  methods: {
    getHumanDate(datetime) {
      return moment(datetime, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY")
    },
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
  },
  mounted() {
    this.startTimer()
  }
}
</script>

<style scoped>

</style>
