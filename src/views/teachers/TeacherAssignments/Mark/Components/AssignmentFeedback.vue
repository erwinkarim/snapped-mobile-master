<template>
  <dashboard-layout :no-bottom-bar="true" :content-fills-screen="true">

    <template v-slot:pageHeader>
      <page-header-three>

        <template v-slot:leftAction>
          <div @click="exitWritingFeedbackMode">
            <icon-base-two class="w-1/4 ml-6">
              <arrow-back-icon stroke-color="red-primary"/>
            </icon-base-two>
          </div>
        </template>

        <template v-slot:mini-title>
          Feedback
        </template>

        <template v-slot:rightAction>
          <div v-if="draft.length === 0" class="text-gray-primary font-bold">
            Done
          </div>
          <div @click="save" v-if="draft.length > 0" class="text-red-primary font-bold">
            Done
          </div>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="pt-32 px-6 w-full ">
      <textarea v-model="draft"
                class="resize-y text-purple-primary  w-full min-h-half-screen  rounded focus:outline-none"></textarea>
      </div>
    </template>
  </dashboard-layout>

</template>

<script>
import PageTitleTwo from "@/components/PageTitleTwo";
import NavBack from "@/components/NavBack";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
//import router from "@/router";
import IconBaseTwo from "@/components/IconBaseTwo";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";

export default {
  name: "AssignmentFeedback",
  components: {ArrowBackIcon, IconBaseTwo, PageHeaderThree, DashboardLayout, NavBack, PageTitleTwo},
  data() {
    return {
      draft: this.$store.state.teacherMarking.submission.feedback
    }
  },
  methods: {
    exitWritingFeedbackMode() {
      this.$store.commit('teacherMarking/exitWritingFeedbackMode')
      this.$router.push({name: 'teacher.assignments.marking.details'})
    },
    save() {
      this.$store.dispatch('teacherMarking/addFeedback', this.draft)
          .then(() => {
            this.$store.commit('teacherMarking/exitWritingFeedbackMode')
            this.$router.push({name: 'teacher.assignments.marking.details'})
          });
    }
  },
}
</script>

<style scoped>

</style>
