<template>
  <dashboard-layout>
    <template v-slot:pageHeader>
      <page-title title="Assignments"/>
    </template>

    <template v-slot:content>
      <div class="px-5">


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
    </template>


  </dashboard-layout>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import AssignmentList from "@/views/students/StudentAssignments/Index/AssignmentList";
import DashboardLayout from "@/views/layout/DashboardLayout";
export default {
name: "Index",
  components: {DashboardLayout, AssignmentList, FilterIcon, IconBaseTwo, SectionTitle, PageTitle}
}
</script>

<style scoped>

</style>
