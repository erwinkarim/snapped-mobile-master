<template>
  <dashboard-layout :has-custom-bottom-bar="modal">

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
        <div class="flex flex-row justify-between items-center mt-8">
          <section-title title="Assignments Date"/>
          <div class="w-1/12">
            <button @click="modal = !modal">
              <icon-base-two stroke-color="purple-primary">
                <filter-icon/>
              </icon-base-two>
            </button>

          </div>
        </div>

        <!-- SECTION: CALENDAR -->
        <div class="bg-white border-2 border-purple-primary border-opacity-10 mt-6 rounded-xl">
          <assignment-calendar @selectedDate="handleSelectedDate" class="w-full" />
        </div>

        <!-- SECTION: ASSIGNMENT -->
        <div class="mt-7 mb-16">

          <!-- Section Title -->
          <div class="flex flex-row justify-between items-center">
            <section-title title="Assignments List"/>
            <div class="text-purple-primary">
              {{ selectedDate }}
            </div>
          </div>
          <!-- Assignment List -->
          <assignment-card
              v-for="assignment in assignments"
              :key="assignment.assignmentID"
              :assignment="assignment"
              :route="{name: 'teacher.assignments.show', params: { assignmentID: assignment.assignmentID }}"
              class="mt-4"
          >
            <template v-slot:topRightAction>
              {{ assignment.totalSubmitted }} submitted
            </template>
          </assignment-card>

          <div v-if="hasError" class="text-purple-secondary mt-12">
            {{ hasError }}
          </div>
        </div>
      </div>
    </template>

    <template v-slot:bottomBar>
      <div class="w-full divide-y divide-transparent">

        <!-- FILTER SELECT OPTIONS -->
        <div class="py-2">
          <div class="grid grid-cols-2 divide-x divide-transparent">
            <div class="text-left px-2">
              Month
              <select-month @selectedMonth="handleSelectedMonth"/>
            </div>
            <div class="text-left px-2">
              Year
              <select-year @selectedYear="handleSelectedYear"/>
            </div>
          </div>
        </div>
        <div class="text-center py-2">
          <select-subject @selectedSubject="handleSelectedSubject"/>
        </div>

        <!-- FILTER ACTIONS -->
        <div class="py-2">
          <div class="grid grid-cols-2 divide-x divide-transparent">
            <div class="text-center">
              <button @click="toggleFilterModal"
                      class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
                <div class="w-5/7">
                  Cancel
                </div>
              </button>
            </div>
            <div class="text-center">
              <button @click="clickedFilterButton"
                      class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
                <div class="w-5/7">
                  Filter
                </div>
                <icon-base-two class="w-1/7">
                  <filter-icon/>
                </icon-base-two>
              </button>
            </div>
          </div>
          <div class="w-4/7 px-2">

          </div>
          <div class="w-3/7 px-2">

          </div>
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
import AssignmentCalendar from "@/components/AssignmentCalendar";

import moment from "moment";
import SelectMonth from "@/components/SelectMonth";
import SelectYear from "@/components/SelectYear";
import SelectSubject from "@/components/SelectSubject";
import AssignmentCard from "@/components/AssignmentCard";
import AssignmentRepository from "@/repositories/AssignmentRepository";

export default {
  name: "TeacherAssignments",
  components: {
    AssignmentCard,
    SelectSubject,
    SelectYear,
    SelectMonth,
    AssignmentCalendar,
    SectionTitle,
    FilterIcon,
    IconBaseTwo,
    PageTitle,
    DashboardLayout
  },
  data() {
    return {
      // States
      hasError: false,
      modal: false,

      assignments: [],

      filters: {
        date: null,
        month: null,
        year: null,
        subjects: null
      }
    };
  },
  computed: {
    selectedDate() {
      return moment(this.filters.date).format('DD MMMM YYYY')
    },
    requestFilter() {

      return {
        is_active: false,
        month: this.filters.month,
        year: this.filters.year,
        subjects: this.filters.subjects !== undefined ? this.filters.subjects : null
      }

    }
  },
  watch: {
    'filters.date': 'fetchData',
  },
  methods: {

    fetchData() {

      this.assignments = [];

      AssignmentRepository.all(this.requestFilter)
          .then(response => {

            let data = response.data.data;

            if (data) {

              const data = response.data.data

              for (let i = 0; i < data.length; i++) {

                let item = data[i];

                let assignmentDetail = {
                  assignmentID: item.assignment_id,
                  subjectName: item.subject_name,
                  classroomName: item.classroom_name,
                  title: item.title,
                  description: item.written_description,
                  dueDatetime: item.due_datetime,
                  totalSubmitted: item.number_of_submissions,
                }

                this.assignments.push(assignmentDetail);
                this.hasError = false;
              }
            } else {

              const error = response.data.error;
              this.hasError = error.message;
            }
          })

      this.resetFilterModalOptions()

    },

    handleSelectedDate(date) {
      this.filters.date = date;
    },
    handleSelectedMonth(month) {
      this.filters.month = month;
    },
    handleSelectedYear(year) {
      this.filters.year = year;
    },
    handleSelectedSubject(subject) {
      this.filters.subjects = [subject]
    },
    clickedFilterButton() {
      this.toggleFilterModal()
      this.fetchData()
    },
    toggleFilterModal() {
      this.modal = !this.modal
    },
    resetFilterModalOptions() {
      this.filters.month = null;
      this.filters.year = null;
      this.filters.subjects = null;
    }
  },
}
</script>

<style scoped>

</style>
