<template>
  <div v-if="timeLeft" :class="containerClass"
       class="rounded-full text-white tracking-tight flex flex-row items-center justify-center px-1 py-1">
    <div v-if="hasClockIcon" class="w-1/7 md:w-1/10">
      <stop-watch-icon/>
    </div>
    <div class="w-5/7 truncate px-1">
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
    hasDynamicBackgroundColor: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
      inSeconds: {
        day: 86400,
        hour: 3600,
        minute: 60
      },
      customBackgroundColor: null
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
    secondsLeft() {
      return this.timeTotal - this.timePassed
    },
    timeLeft() {

      let secondsLeft = this.secondsLeft;
      let value = null;

      if (this.hasTwentyFourHourLimit && secondsLeft > this.inSeconds.day) {
        clearInterval(this.timerInterval)
      } else if (secondsLeft > 0) {

        // If more than 24 hours, display in terms of days
        if (secondsLeft > this.inSeconds.day) {
          let days = Math.floor(secondsLeft / this.inSeconds.day);

          if (days > 30) {
            let months = Math.floor(days / 30);
            value = `${months} ${days === 1 ? 'month' : 'months'}`
          } else {
            value = `> ${days} ${days === 1 ? 'day' : 'days'}`
          }

          this.customBackgroundColor = 'bg-purple-primary'

        }
        // Else, display in format hh:mm:ss
        else {
          let hours = Math.floor(secondsLeft / this.inSeconds.hour);
          secondsLeft -= hours * this.inSeconds.hour;

          let minutes = Math.floor(secondsLeft / this.inSeconds.minute)
          secondsLeft -= minutes * this.inSeconds.minute;

          let seconds = secondsLeft % this.inSeconds.minute

          hours < 10 ? hours = `0${hours}` : null;
          minutes < 10 ? minutes = `0${minutes}` : null;
          seconds < 10 ? seconds = `0${seconds}` : null;

          value = `${hours}:${minutes}:${seconds}`

          if (hours < 1) {
            this.customBackgroundColor = 'bg-yellow-primary'
          } else {
            this.customBackgroundColor = 'bg-purple-primary'
          }
        }

      } else {
        clearInterval(this.timerInterval)
        value = '00:00:00'
        this.customBackgroundColor = 'bg-red-primary'
      }

      return value
    },
    containerClass() {
      if (this.hasDynamicBackgroundColor && this.customBackgroundColor) {
        return this.customBackgroundColor;
      } else {
        return 'bg-transparent'
      }
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
