<template>
  <radial-progress-bar
      :diameter="diameter"
      :completed-steps="score"
      :total-steps="totalScore"
      :startColor="strokeColor"
      :stopColor="strokeColor"
      :strokeLinecap="strokeLinecap"
      :strokeWidth="strokeWidth"
      :innerStrokeWidth="innerStrokeWidth"
      :innerStrokeColor="appInnerStrokeColor"
      :isClockwise="isClockwise"
      :animateSpeed="animateSpeed"
  >
    <div :style="displayColor" class="font-bold text-lg">
      {{ displayValue.toString() }}%
    </div>
  </radial-progress-bar>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  name: "AssignmentScoreCircle",
  props: {
    displayValue: String,
    diameter: Number,
    score: Number,
    totalScore: Number,
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
    strokeColor() {
      if (this.score > 80) {
        return "#05C46B";
      } else if (this.score > 40)  {
        return "#FDB400";
      } else {
        return "#F53B57"
      }
    },
    appInnerStrokeColor() {
      switch (this.innerStrokeColor) {

        case 'gray':
          return "#F1F3F6";

        default:
          return this.innerStrokeColor
      }
    },
    displayColor() {
      if (this.score > 80) {
        return {color: "#05C46B"};
      } else if (this.score > 40)  {
        return {color: "#FDB400"};
      } else {
        return {color: "#F53B57"};
      }
    }
  },
  components: {
    RadialProgressBar
  }
}
</script>

<style scoped>

</style>
