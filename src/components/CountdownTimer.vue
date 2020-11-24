<template>
  <div v-if="timeLeft" :class="containerClass"  class="rounded-full text-white tracking-tight flex flex-row items-center justify-center px-1 py-1">
    <div v-if="hasClockIcon" class="w-1/7">
      <stop-watch-icon />
    </div>
    <div class="w-5/7">
      {{ timeLeft }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
import StopWatchIcon from "@/components/icons/StopWatchIcon";

export default {
  name: "CountdownTimer",
  components: {StopWatchIcon},
  props: {
    dueDateTime: {
      type: String,
      required: true,
    },
    hasClockIcon: {
      type: Boolean,
      default: false
    },
    hasTwentyFourHourLimit: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'bg-transparent'
    }
  },
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
    }
  },
  computed: {
    timeTotal() {
      // Calculate total time based on difference from now to due date
      let now = moment().toDate()
      let dueDateTime = moment(this.dueDateTime, 'YYYY-MM-DD HH:mm:ss')

      let timeDiff = dueDateTime.diff(now);
      let duration = moment.duration(timeDiff);

      return Math.floor(duration.asSeconds());
    },
    timeLeft() {

      let secondsLeft = this.timeTotal - this.timePassed;

      let value = null;

      if (this.hasTwentyFourHourLimit && secondsLeft > 86400) {
        clearInterval(this.timerInterval)

      } else if (secondsLeft > 0) {
        let hours = Math.floor(secondsLeft / 3600);
        secondsLeft -= hours * 3600;

        let minutes = Math.floor(secondsLeft / 60)
        secondsLeft -= minutes * 60;

        let seconds = secondsLeft % 60

        hours < 10 ? hours = `0${hours}` : null;
        minutes < 10 ? minutes = `0${minutes}` : null;
        seconds < 10 ? seconds = `0${seconds}` : null;

        value = `${hours}:${minutes}:${seconds}`
      } else {
        clearInterval(this.timerInterval)
        value = '00:00:00'
      }

      return value
    },

    containerClass(){
        return this.backgroundColor;
    }
  },
  methods: {
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
