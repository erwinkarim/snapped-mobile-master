<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       width="100%"
       :viewBox="viewBox"
       :aria-labelledby="iconName"
       role="presentation"
       preserveAspectRatio="xMidYMid meet"
  >
    <title :id="iconName" lang="en">
      {{ iconName }} icon
    </title>

    <g :style="{fill: getStrokeColor}" :fill="iconColor">
      <slot/>
    </g>

  </svg>
</template>

<script>
export default {
name: "IconBaseTwo",
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    viewBox: {
      type: [Number, String],
      default: "0 0 60 55"
    },
    iconColor: {
      type: String,
      default: 'white'
    },
    strokeColor: {
      type: String
    }
  },
  computed: {
    getStrokeColor(){

      if (this.strokeColor === 'purple-primary') {
        return '#3A4276'
      }

      if (this.strokeColor === 'purple-secondary') {
        return '#7B7F9E'
      }

      if (this.strokeColor === 'red-primary') {
        return '#F53B57'
      }

      return this.strokeColor
    }
  }
}
</script>

<style scoped>

</style>
