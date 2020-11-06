<template>
  <div class="pt-5">
    <div class="px-5">

      <!-- TITLE -->
      <div class="flex flex-row justify-between pt-5 items-baseline">
        <page-title class="w-3/4 ">Assignment</page-title>
        <router-link :to="{name : 'teacher.assignments.create'}" class="font-bold text-red-primary">
          Add New
        </router-link>
      </div>

      <!-- Section Title -->
      <div class="flex flex-row justify-between mt-8">
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
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import SectionTitle from "@/components/SectionTitle";
import AssignmentCalendar from "@/views/teachers/TeacherAssignments/Index/Components/AssignmentCalendar";
import AssignmentList from "@/views/teachers/TeacherAssignments/Index/Components/AssignmentList";

export default {
  name: "TeacherAssignments",
  components: {AssignmentCalendar, SectionTitle, FilterIcon, IconBaseTwo, PageTitle, DashboardLayout, AssignmentList}
}
</script>

<style scoped>

</style>
