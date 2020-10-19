<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       :viewBox="viewBox"
       :aria-labelledby="iconName"
       role="presentation"
       preserveAspectRatio="xMidYMid meet"
  >
    <title :id="iconName" lang="en">
      {{ iconName }} icon
    </title>
    <g :fill="iconColor">
      <slot/>
    </g>
  </svg>
</template>

<script>
import IconBase from "@/components/IconBase";

export default {
  name: "BottomNavbarIconBase",
  components: {IconBase},
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
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
      type: String,
      default: '#BEBEBE'
    },
  }
}
</script>

<style scoped>
  a.router-link-exact-active g {
    fill: #F53B57;
  }

  g {
    fill: #BEBEBE;
  }
</style>
