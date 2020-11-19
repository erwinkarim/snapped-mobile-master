<template>
  <div>
    <router-view
        v-on:feedback="handleFeedback"
        :feedback = "submission.feedback"

        v-on:marks="handleMark"
        :new-marks = "submission.marks"
    />
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      submission: {
        feedback: '',
        marks: null
      }
    }
  },
  methods: {
    handleFeedback (value) {
      this.submission.feedback = value
    },
    handleMark (value) {
      this.submission.marks = value
    }
  }
}
</script>

<style scoped>

</style>
