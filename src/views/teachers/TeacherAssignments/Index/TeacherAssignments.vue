<template>
  <dashboard-layout class="">

    <template v-slot:pageHeader>
        <page-title title="Assignments">
          <template v-slot:rightAction>
            <router-link :to="{name : 'teacher.assignments.create'}" class="font-bold text-red-primary text-right">
              Add New
            </router-link>
          </template>
        </page-title>
    </template>

    <template v-slot:content>
      <div class="px-5">



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
        <div class="bg-white border-2 border-purple-primary border-opacity-10 mt-6 rounded-xl">
          <v-calendar class="w-full" :attributes="attributes" @dayclick="onDayClick" />
        </div>

        <!-- SECTION: ASSIGNMENT -->
        <div class="mt-7">

          <!-- Section Title -->
          <div class="flex flex-row justify-between items-center">
            <section-title  title="Assignments List"/>
            <div class="text-purple-primary">
              {{days.id}}
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
import Vue from 'vue';
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import SectionTitle from "@/components/SectionTitle";
import AssignmentCalendar from "@/views/teachers/TeacherAssignments/Index/Components/AssignmentCalendar";
import AssignmentList from "@/views/teachers/TeacherAssignments/Index/Components/AssignmentList";
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
Vue.component('v-calendar', Calendar)
Vue.component('v-date-picker', DatePicker)

export default {
  name: "TeacherAssignments",
  components: {AssignmentCalendar, SectionTitle, FilterIcon, IconBaseTwo, PageTitle, DashboardLayout, AssignmentList},
  data() {
    return {
      days: [],
    };
  },
  computed: {
    dates() {
      return this.days.map(day => day.date);
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: true,
        dates: date,
      }));
    },
  },
  methods: {
    onDayClick(day) {
      const idx = this.days.findIndex(d => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });
      }
    },
  },
}
</script>

<style scoped>

</style>
