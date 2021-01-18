<template>
  <dashboard-layout :has-custom-bottom-bar="modal">
    <template v-slot:pageHeader>
      <page-title title="Assignments"/>
    </template>

    <template v-slot:content>
      <div class="px-5 w-full max-w-xl">


        <!-- Section Title -->
        <div class="flex flex-row justify-between mt-8 items-center">
          <section-title title="Due Dates"/>
          <div class="w-1/12 md:w-1/24" @click="modal = !modal">
            <icon-base-two stroke-color="purple-primary">
              <filter-icon/>
            </icon-base-two>
          </div>
        </div>

        <!-- SECTION: CALENDAR -->
        <div class="bg-white border-2 border-purple-primary border-opacity-10 mt-6 rounded-xl ">
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
          <div class="mt-4">
            <assignment-card
                v-for="assignment in assignments"
                :key="assignment.assignmentID"
                :route="{name: 'student.assignments.show', params: { assignmentID: assignment.assignmentID }}"
                :assignment="assignment"
                :show-marks="true"
            >
              <template v-slot:topRightAction v-if="!assignment.marks">
                <div class="pr-1 md:pr-3">
                  {{ assignment.totalSubmitted }} submitted
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
              <div slot="no-results">No available data.</div>
            </infinite-loading>
          </div>

          <div v-if="hasError" class="text-purple-secondary mt-12">
            {{ hasError }}
          </div>

        </div>

      </div>
    </template>


    <!-- BOTTOM BAR: FILTER PANEL-->
    <template v-slot:bottomBar>
      <div class="w-full md:max-w-xl divide-y divide-transparent">

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
          <select-subject user-role="student"
              @selectedSubject="handleSelectedSubject"
          />
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
                      class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row  items-center justify-center">
                <div class="w-5/7">
                  Filter
                </div>
                <icon-base-two class="w-1/7 md:w-1/12">
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
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import DashboardLayout from "@/views/layout/DashboardLayout";
import AssignmentCard from "@/components/AssignmentCard";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import AssignmentCalendar from "@/components/AssignmentCalendar";
import SelectMonth from "@/components/SelectMonth";
import SelectYear from "@/components/SelectYear";
import SelectSubject from "@/components/SelectSubject";
import moment from "moment";
import StudentRepository from "@/repositories/StudentRepository";
import InfiniteLoading from "vue-infinite-loading";


export default {
  name: "Index",
  data() {
    return {

      // States
      hasError: false,
      modal: false,

      filterCount: 0,
      filters: {
        pageNum: 1,
        perPage: 20,
        search: '',
        date: null,
        month: null,
        year: null,
        subjects: null
      },

      assignments: [],
      meta: null
    }
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
        date: this.filters.date,
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
    }
  },
  methods: {

    handleInfiniteScroll($state) {

      if (this.hasLoadMore) {

        AssignmentRepository.all(this.requestFilter)
            .then(response => {

              if (response.data.data) {

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
                const error = response.data.error;
                this.hasError = error.message;
              }
            })

        this.resetFilterModalOptions()
      }else {
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
      this.filters.subjects = [subject];
      this.filters.date = null;
    },
    clickedFilterButton() {
      this.toggleFilterModal()
      this.updateFilter()
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
      this.filters.perPage = 20

      this.assignments = [];
      this.filterCount++;
    }
  },
  components: {
    SelectSubject,
    SelectYear,
    SelectMonth,
    AssignmentCalendar,
    AssignmentCard,
    DashboardLayout,
    FilterIcon,
    IconBaseTwo,
    SectionTitle,
    PageTitle,
    InfiniteLoading
  },
}
</script>

<style scoped>

</style>
