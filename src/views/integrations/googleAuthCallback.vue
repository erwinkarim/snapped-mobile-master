<template>
  <div>
    test
  </div>
</template>

<script>
export default {
  name: "googleAuthCallback",
  methods: {
    googleClassroomCallback() {
      let code = this.$route.query.code;
      this.$store.dispatch('googleClassroom/integrationCallback', code)
    }
  },
  created() {
    this.googleClassroomCallback();
  }
}
</script>

<style scoped>

</style>
