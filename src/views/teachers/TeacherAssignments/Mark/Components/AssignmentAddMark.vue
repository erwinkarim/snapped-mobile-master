<template>
  <dashboard-layout :no-bottom-bar="true" :has-fixed-header="true">

    <template v-slot:pageHeader>
      <page-header-three :has-bottom-border="true" :bottom-padding="10">

        <template v-slot:leftAction>
          <nav-back class="w-2/3" stroke-color="red-primary"/>
        </template>

        <template v-slot:mini-title>
          Add Mark
        </template>

        <template v-slot:rightAction>
          <router-link :to="{name: ''}" v-if="mark" class="text-red-primary font-bold">
            Done
          </router-link>
          <div v-else class="text-gray-primary font-bold">
            Done
          </div>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content >
      <div class="relative top-42 text-left ">
        <div class="px-7 border-b-1 border-gray-primary border-opacity-15 pb-3 text-purple-primary text-sm">
          Enter the mark for this assignment
        </div>
        <input v-model="mark" type="number" placeholder="Mark"
               class="px-7 border-b-1 border-gray-primary border-opacity-15 py-4 text-purple-primary text-sm">

        <div class="px-7 pt-5 text-purple-secondary text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </template>

  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";

export default {
  name: "AssignmentAddMark",
  data() {
    return {
      mark: null
    }
  },
  components: {NavBack, PageHeaderThree, DashboardLayout}
}
</script>

<style scoped>

</style>
