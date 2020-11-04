<template>
    <router-view v-on:test="testHandler" :answer="answer"/>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      answer: ''
    }
  },
  methods: {
    testHandler(value) {
      this.answer = value
    }
  }
}
</script>

<style scoped>

</style>
