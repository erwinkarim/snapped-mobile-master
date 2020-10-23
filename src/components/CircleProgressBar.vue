<template>
  <radial-progress-bar
      :diameter="diameter"
      :completed-steps="completedSteps"
      :total-steps="totalSteps"
      :startColor="appStartColor"
      :stopColor="appStartColor"
      :strokeLinecap="strokeLinecap"
      :strokeWidth="strokeWidth"
      :innerStrokeWidth="innerStrokeWidth"
      :innerStrokeColor="appInnerStrokeColor"
      :isClockwise="isClockwise"
      :animateSpeed="animateSpeed"
  >
    <div class="text-purple-primary font-bold text-lg">
      {{ displayValue }}
    </div>
  </radial-progress-bar>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: "CircleProgressBar",
  props: {
    displayValue: String,
    diameter : Number,
    completedSteps: Number,
    totalSteps: Number,
    startColor: String,
    stopColor: String,
    strokeLinecap: String,
    strokeWidth: Number,
    innerStrokeWidth: Number,
    innerStrokeColor: String,
    isClockwise: {
      type: Boolean,
      default: true
    },
    animateSpeed: Number
  },
  computed: {
    appStartColor() {
      switch (this.startColor) {
        case 'green':
          return "#05C46B";

        case 'red':
          return "#F53B57";

        case 'purple':
          return "#3A4276";

        default:
          return this.startColor
      }
    },
    appInnerStrokeColor() {
      switch (this.innerStrokeColor) {

        case 'gray':
          return "#F1F3F6";

        default:
          return this.innerStrokeColor
      }
    }
  },
  components: {
    RadialProgressBar
  }
}
</script>
