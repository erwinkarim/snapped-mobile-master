<template>
  <dashboard-layout :content-fills-screen="true" :no-bottom-bar="true">

    <template v-slot:pageHeader>
      <page-header-three>

        <template v-slot:leftAction>
          <nav-back :to="navBackRoute" class="w-2/7" stroke-color="red-primary"/>
        </template>

        <template v-slot:mini-title>
          Write Answer
        </template>

        <template v-slot:rightAction>
          <div v-if="writtenAnswer.length === 0 "
               class="text-gray-primary font-bold"
          >
            Save
          </div>
          <router-link v-if="writtenAnswer.length > 0"
                       :to="{name: 'student.assignments.answer.store', params: { assignmentDetails: assignmentDetails }}"
                       class="text-red-primary font-bold"
          >
            Save
          </router-link>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class=" pt-32 px-6 h-full">
        <textarea @keyup="compileAnswer" v-model="latestAnswer"
                  class="resize-y text-purple-primary  w-full h-full  rounded focus:outline-none"
        />
      </div>
    </template>


  </dashboard-layout>

</template>

<script>
import NavBack from "@/components/NavBack";
import PageTitleTwo from "@/components/PageTitleTwo";
import Modal from "@/components/Modal";
import PageHeaderThree from "@/components/PageHeaderThree";
import DashboardLayout from "@/views/layout/DashboardLayout";

export default {
  name: "AnswerWrite",
  props: {
    answer: Object,
    assignmentDetails: Object,
    isEditingAnswer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    writtenAnswer() {
      return this.answer.content;
    },
    navBackRoute() {
      if (this.isEditingAnswer) {
        return {name: 'student.assignments.answer.store', params: { assignmentDetails: this.assignmentDetails }};
      } else {
        return {name: 'student.assignments.show'}
      }
    }
  },
  data() {
    return {
      latestAnswer: ''
    }
  },
  methods: {
    compileAnswer() {
      this.$emit('writtenAnswer', this.latestAnswer)
    },
  },

  mounted() {
    this.latestAnswer = this.writtenAnswer;
  },
  components: {DashboardLayout, PageHeaderThree, Modal, PageTitleTwo, NavBack}
}
</script>

<style scoped>

</style>
