<template>
  <div class="pt-5">
    <div class="px-5">

      <!-- TITLE -->
      <div class="flex flex-row justify-between pt-5 items-baseline">
        <page-title class="w-3/4 ">Assignment</page-title>
        <div class="font-bold text-red-primary"> Add New</div>
      </div>

      <!-- Section Title -->
      <div class="flex flex-row justify-between mt-8">
        <section-title  title="Assignments Date"/>
        <div class="w-1/6">
          <icon-base-two stroke-color="purple-primary">
            <filter-icon/>
          </icon-base-two>
        </div>
      </div>

      <div class="w-full bg-purple-primary">
<!--        <assignment-calendar />-->
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
import AssignmentCalendar from "@/views/teachers/TeacherAssignments/Components/AssignmentCalendar";

export default {
  name: "TeacherAssignments",
  components: {AssignmentCalendar, SectionTitle, FilterIcon, IconBaseTwo, PageTitle, DashboardLayout}
}
</script>

<style scoped>

</style>
