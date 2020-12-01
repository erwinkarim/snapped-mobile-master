<template>
  <dashboard-layout :no-bottom-bar="true" :content-fills-screen="true">

    <template v-slot:pageHeader>
      <page-header-three>

        <template v-slot:leftAction>
          <nav-back class="w-2/7" stroke-color="red-primary"/>
        </template>

        <template v-slot:mini-title>
          Feedback
        </template>

        <template v-slot:rightAction>
          <div v-if="newFeedback.length === 0" class="text-gray-primary font-bold">
            Done
          </div>
          <div @click="save" v-if="newFeedback.length > 0" class="text-red-primary font-bold">
            Done
          </div>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="pt-32 px-6 h-full">
      <textarea v-model="newFeedback"
                class="resize-y text-purple-primary  w-full h-full  rounded focus:outline-none"></textarea>
      </div>
    </template>
  </dashboard-layout>

</template>

<script>
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import router from "@/router";
export default {
  name: "AssignmentFeedback",
  components: {PageHeaderThree, DashboardLayout, NavBack, PageTitleTwo},
  props: {
    feedback: String
  },
  data() {
    return {
      newFeedback: ''
    }
  },
  methods: {
    save() {
      this.$emit('feedback', this.newFeedback)
      router.push({name: 'teacher.assignments.marking.details'})
    }
  },
  mounted() {
    this.newFeedback = this.feedback
  }
}
</script>

<style scoped>

</style>
