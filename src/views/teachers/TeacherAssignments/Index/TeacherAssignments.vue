<template>
  <dashboard-layout :has-custom-bottom-bar="modal">

    <template v-slot:pageHeader>
      <page-title title="Assignments">
        <template v-slot:rightAction>
          <router-link :to="{name : 'teacher.assignments.create'}"
                       class="flex flex-row justify-end items-center font-bold text-red-primary text-right"
          >
            Add New
          </router-link>
        </template>

      </page-title>
    </template>

    <template v-slot:content>
      <div class="px-5 w-full">
        <!-- Section Title -->
        <div class="flex flex-row justify-between items-center mt-8">
          <section-title title="Due Dates"/>
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
          <assignment-calendar @selectedDate="handleSelectedDate"/>
        </div>

        <!-- SECTION: ASSIGNMENT -->
        <div class="mt-7 mb-16">

          <!-- Section Title -->
          <div class="flex flex-row justify-between items-center">
            <section-title title="To-Do List"/>
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
              :display-countdown-timer="assignment.totalMarked !== assignment.totalSubmitted"
              class="mt-4"
          >
            <template v-slot:topRightAction>
              <div class="flex flex-col">
                <div class="mb-1">
                  {{ assignment.totalSubmitted }} submitted
                </div>
                <div>
                  {{ assignment.totalMarked }} marked
                </div>
              </div>
            </template>
          </assignment-card>

          <infinite-loading :identifier="filterCount"
                            @infinite="handleInfiniteScroll"
                            spinner="bubbles"
                            force-use-infinite-wrapper
          >
            <div slot="spinner" class="mt-10">Loading...</div>
            <div slot="no-more"></div>
            <div slot="no-results" class="text-purple-secondary mt-12">
              No available data.
            </div>
          </infinite-loading>
        </div>
      </div>
    </template>

    <template v-slot:bottomBar>
      <div class="w-full max-w-xl divide-y divide-transparent">

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
          <select-subject user-role="teacher" @selectedSubject="handleSelectedSubject"/>
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
                <div class="w-1/7">
                  <icon-base-two class="w-full md:w-1/2">
                    <filter-icon/>
                  </icon-base-two>
                </div>
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
import InfiniteLoading from "vue-infinite-loading";

import moment from "moment";
import SelectMonth from "@/components/SelectMonth";
import SelectYear from "@/components/SelectYear";
import SelectSubject from "@/components/SelectSubject";
import AssignmentCard from "@/components/AssignmentCard";
import AssignmentRepository from "@/repositories/AssignmentRepository";

export default {
  name: "TeacherAssignments",
  data() {
    return {
      // States
      hasError: false,
      modal: false,

      filterCount: 0,
      filters: {
        pageNum: 1,
        perPage: 50,
        search: '',
        date: null,
        month: null,
        year: null,
        subjects: null
      },

      assignments: [],
      meta: null, 

      date: new Date(),

    };
  },

  watch: {
    'filters.date': function (newSelect) {
      if (newSelect != null) {
        this.updateFilter()
      }
    }
  },
  computed: {
    selectedDate() {
      if (this.filters.date) {
        return moment(this.filters.date).format('DD MMMM YYYY')
      }
    },
    requestFilter() {
      return {
        pageNum: this.filters.pageNum,
        perPage: this.filters.perPage,
        is_active: false,
        date: moment(this.filters.date).format('DD MMMM YYYY'), // this.filters.date, <- time zone will screw you
        month: this.filters.month,
        year: this.filters.year,
        subjects: this.filters.subjects !== undefined ? this.filters.subjects : null
      }
    },
    hasLoadMore() {
      if (this.meta) {
        return this.filters.pageNum <= this.meta.last_page
      } else {
        return true;
      }
    },
  },
  methods: {

    handleInfiniteScroll($state) {

      if (this.hasLoadMore) {

        AssignmentRepository.all(this.requestFilter)
            .then(response => {

              if (response.data.success) {

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
                    totalMarked: item.num_of_marked_submissions,
                    school_name: item.school_name,
                    auto_marking: item.auto_marking,
                  }

                  if (item.marks_id) {
                    assignmentDetail['marks'] = {
                      id: item.marks_id,
                      value: item.marks
                    }
                  }

                  this.assignments.push(assignmentDetail);
                  this.hasError = false;
                }

                // Update meta details and pageNum for filters
                this.meta = response.data.meta;
                this.filters.pageNum = this.meta.current_page + 1;

                $state.loaded();
              } else {
                this.hasError = response.data.message;
                $state.complete()
              }
            })

        this.resetFilterModalOptions()
      } else {
        $state.complete();
      }

    },

    handleSelectedDate(date) {
      this.filters.date = date;
    },
    handleSelectedMonth(month) {
      this.filters.month = month;
      this.filters.date = null;
    },
    handleSelectedYear(year) {
      this.filters.year = year;
      this.filters.date = null;
    },
    handleSelectedSubject(subject) {
      this.filters.subjects = [subject]
      this.filters.date = null;
    },
    clickedFilterButton() {
      this.toggleFilterModal()
      this.updateFilter();
    },
    toggleFilterModal() {
      this.modal = !this.modal
    },
    resetFilterModalOptions() {
      this.filters.month = null;
      this.filters.year = null;
      this.filters.subjects = null;
    },
    updateFilter() {
      this.filters.pageNum = 1
      this.filters.perPage = 50

      this.assignments = [];
      this.filterCount++;
    }
  },
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
    DashboardLayout,
    InfiniteLoading
  }
}
</script>

<style scoped>

</style>
