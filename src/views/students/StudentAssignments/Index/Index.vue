<template>
  <div class="pt-5">
    <div class="px-5">

      <!-- TITLE -->
      <div class="flex flex-row justify-between pt-5 items-baseline">
        <page-title class="w-3/4 ">Assignment</page-title>
      </div>

      <!-- Section Title -->
      <div class="flex flex-row justify-between mt-8 items-center">
        <section-title  title="Assignments Date"/>
        <div class="w-1/12">
          <icon-base-two stroke-color="purple-primary">
            <filter-icon/>
          </icon-base-two>
        </div>
      </div>

      <!-- SECTION: CALENDAR -->
      <div class="w-full bg-white border-2 border-purple-primary border-opacity-10 pb-4/5 mt-6 rounded-xl">

      </div>

      <!-- SECTION: ASSIGNMENT -->
      <div class="mt-7">

        <!-- Section Title -->
        <div class="flex flex-row justify-between items-center">
          <section-title  title="Assignments List"/>
          <div class="text-purple-primary">
            17 June 2020
          </div>
        </div>

        <!-- Assignment List -->
        <assignment-list class="mt-4"/>

      </div>

    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import AssignmentList from "@/views/students/StudentAssignments/Index/AssignmentList";
export default {
name: "Index",
  components: {AssignmentList, FilterIcon, IconBaseTwo, SectionTitle, PageTitle}
}
</script>

<style scoped>

</style>
