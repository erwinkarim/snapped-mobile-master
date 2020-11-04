<template>
  <div class="h-screen pb-10">


    <!-- -->
    <page-title-two>
      <template v-slot:leftAction>
        <nav-back class="w-2/3" stroke-color="red-primary"/>
      </template>
      <template v-slot:title>
        Write Answer
      </template>
      <template v-slot:rightAction>
        <div v-if="answer.length === 0" class="text-gray-primary font-bold">
          Save
        </div>
        <router-link :to="{name: 'student.assignments.answer.save'}" v-if="answer.length > 0" class="text-red-primary font-bold">
          Save
        </router-link>
      </template>
    </page-title-two>

    <div class="relative pt-40 px-6 h-full">
      <textarea @keyup="compileAnswer" v-model="latestAnswer" class="resize-y text-purple-primary  w-full h-full  rounded focus:outline-none"></textarea>
    </div>

  </div>

</template>

<script>
import NavBack from "@/components/NavBack";
import PageTitleTwo from "@/components/PageTitleTwo";
import Modal from "@/components/Modal";

export default {
  name: "AnswerWrite",
  props: {
    answer: String
  },
  data () {
    return {
      latestAnswer: ''
    }
  },
  mounted() {
    this.latestAnswer = this.answer
  },
  methods: {
    compileAnswer () {
      this.$emit('test', this.latestAnswer)
    },
  },
  components: {Modal, PageTitleTwo, NavBack}
}
</script>

<style scoped>

</style>
