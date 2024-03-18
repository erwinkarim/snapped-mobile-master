<template>
  <dashboard-layout :no-bottom-bar="true" :has-fixed-header="true">

    <template v-slot:pageHeader>
      <page-header-three :has-bottom-border="true" :bottom-padding="10">

        <template v-slot:leftAction>
          <nav-back class="w-2/7" stroke-color="red-primary"/>
        </template>

        <template v-slot:mini-title>
          Add Mark
        </template>

        <template v-slot:rightAction>
          <div @click="save" :to="{name: ''}" v-if="marks" class="text-red-primary font-bold">
            Done
          </div>
          <div v-else class="text-gray-primary font-bold">
            Done
          </div>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="relative top-42 text-left w-full ">
        <div class="px-7 border-b-1 border-gray-primary border-opacity-15 pb-3 text-purple-primary text-sm">
          Enter the mark for this assignment
        </div>
        <div class="flex flex-row items-center w-full border-b-1 border-gray-primary border-opacity-15 tracking-wider">
          <input v-model="marks"
                 type="number" placeholder="Mark"
                 min="0"
                 max="100"
                 class="px-7 w-1/2 py-4 text-purple-primary text-sm"
          >
          <div>
            / 100
          </div>
        </div>
        <div class="bg-red-500 mb-4 md:max-w-xl mt-5 w-9/10 mx-auto py-3 px-4 text-left text-white text-xs rounded-lg" v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </div>
    </template>

  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
// import router from "@/router";

export default {
  name: "AssignmentAddMark",
  data() {
    return {
      errorMessage: null,
      marks: this.$store.state.teacherMarking.submission.marks
    }
  },
  methods: {
    save() {

      if (this.marks <= 100) {
        this.$store.dispatch('teacherMarking/addMark', this.marks)
            .then(() => {
              this.errorMessage = null
              this.$router.push({name: 'teacher.assignments.marking.details'})
            })
      } else {
        this.errorMessage  = 'Please enter a value between 0 and 100.'
      }


    }
  },
  components: {NavBack, PageHeaderThree, DashboardLayout}
}
</script>

<style scoped>

</style>
