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

    <g :style="isActiveTab(tabName)" :fill="iconColor">
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
    tabName: {
      type: String,
      default: 'home'
    },
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
  },
  data() {
    return {
      activeTab: 'home'
    }
  },
  watch: {
    $route(to, from) {
      this.getActiveTab()
    }
  },
  methods: {
    isActiveTab(tabName) {
      if (this.activeTab === tabName) {
        return {fill: "#F53B57"};
      }

      return {fill: "#BEBEBE"};
    },
    getActiveTab() {

      if ((this.$route.path).includes('teacher/students') || (this.$route.path).includes('teacher/student')) {
        this.activeTab = 'students'
      } else if ((this.$route.path).includes('teacher/classes') || (this.$route.path).includes('teacher/class')) {
        this.activeTab = 'classes'
      } else if ((this.$route.path).includes('teacher/assignments') || (this.$route.path).includes('teacher/assignment')) {
        this.activeTab = 'assignments'
      } else if ((this.$route.path).includes('teacher/settings')) {
        this.activeTab = 'settings'
      } else {
        this.activeTab = 'home'
      }
    }
  },
  created() {
    this.getActiveTab()
  }
}
</script>

<style scoped>
</style>
