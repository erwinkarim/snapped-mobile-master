<template>
  <dashboard-layout :no-bottom-bar="true" :content-fills-screen="true">

    <template v-slot:pageHeader>
      <page-header-three>

        <template v-slot:leftAction>
          <nav-back class="w-2/3" stroke-color="red-primary"/>
        </template>

        <template v-slot:mini-title>
          Feedback
        </template>

        <template v-slot:rightAction>
          <div v-if="feedback.length === 0" class="text-gray-primary font-bold">
            Done
          </div>
          <router-link :to="{name: ''}" v-if="feedback.length > 0" class="text-red-primary font-bold">
            Done
          </router-link>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="pt-32 px-6 h-full">
      <textarea v-model="feedback"
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
export default {
  name: "AssignmentFeedback",
  components: {PageHeaderThree, DashboardLayout, NavBack, PageTitleTwo},
  data() {
    return {
      feedback: ''
    }
  }
}
</script>

<style scoped>

</style>
