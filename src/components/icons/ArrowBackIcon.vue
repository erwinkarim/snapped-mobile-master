<template>
  <svg width="100%" viewBox="5 5 15 19">
    <path opacity="0.01" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V26.496H26.496V0H0Z" fill="#1C8FF8"
          fill-opacity="0.338428"/>
    <path d="M20.4238 13.5239H6.62378" :stroke="getStrokeColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
    <path d="M11.799 18.768L6.62402 13.524L11.799 8.28003" :stroke="getStrokeColor" fill-opacity="0.0" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
  </svg>
</template>

<script>
export default {
  name: "ArrowBackIcon",
  props: {
    strokeColor: String,
    default: "#1C8FF8"
  },
  computed: {
    getStrokeColor() {

      if (this.strokeColor === 'red-primary') {
        return '#F53B57'
      }

      if (this.strokeColor === 'purple-primary') {
        return '#3A4276';
      }

      if (this.strokeColor === 'white') {
        return '#FFFFFF';
      }

      return '#BEBEBE'
    }
  },
}
</script>

<style scoped>

</style>
