<template>
  <svg width="100%" viewBox="3 4 20 20">
    <path opacity="0.01" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V26.496H26.496V0H0Z" fill=""
          fill-opacity="0.0"/>
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M11.9599 18.4C15.5166 18.4 18.3999 15.5167 18.3999 11.96C18.3999 8.40331 15.5166 5.52002 11.9599 5.52002C8.40318 5.52002 5.5199 8.40331 5.5199 11.96C5.5199 15.5167 8.40318 18.4 11.9599 18.4Z"
          :stroke="getStrokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.9758 20.9761L16.5107 16.511" :stroke="getStrokeColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
  </svg>
</template>

<script>
export default {
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
        return '#7B7F9E';
      }

      return '#BEBEBE'
    }
  },
  name: "MagnifyingGlassIcon"
}
</script>

<style scoped>

</style>
