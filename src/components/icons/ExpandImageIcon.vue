<template>
  <svg width="100%" viewBox="0 0 20 20">
    <path d="M7.46648 12.5335C7.16137 12.2284 6.66672 12.2284 6.36164 12.5335L1.5625 17.3326V14.2578C1.5625 13.8263 1.21273 13.4766 0.78125 13.4766C0.349766 13.4766 0 13.8263 0 14.2578V17.6562C0 18.9486 1.05141 20 2.34375 20H5.74219C6.17367 20 6.52344 19.6502 6.52344 19.2188C6.52344 18.7873 6.17367 18.4375 5.74219 18.4375H2.66738L7.46648 13.6384C7.7716 13.3333 7.7716 12.8386 7.46648 12.5335Z" :fill="getStrokeColor"/>
    <path d="M17.6563 0H14.2578C13.8263 0 13.4766 0.349766 13.4766 0.78125C13.4766 1.21273 13.8263 1.5625 14.2578 1.5625H17.3326L12.5335 6.3616C12.2284 6.66672 12.2284 7.16141 12.5335 7.46648C12.6861 7.61906 12.886 7.69531 13.0859 7.69531C13.2859 7.69531 13.4858 7.61906 13.6384 7.46652L18.4375 2.66738V5.74219C18.4375 6.17367 18.7873 6.52344 19.2188 6.52344C19.6502 6.52344 20 6.17367 20 5.74219V2.34375C20 1.05141 18.9486 0 17.6563 0Z" :fill="getStrokeColor"/>
  </svg>
</template>

<script>
export default {
name: "ExpandImageIcon",
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

      if (this.strokeColor === 'black') {
        return '#2A2A2A';
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
