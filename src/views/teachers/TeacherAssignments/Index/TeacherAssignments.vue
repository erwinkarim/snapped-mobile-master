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
        <div class="flex flex-row justify-between mt-8">
          <section-title  title="Assignments Date"/>
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
          <v-date-picker class="w-full" v-model="date" :attributes="attributes"/>
        </div>

        <!-- SECTION: ASSIGNMENT -->
        <div class="mt-7">

          <!-- Section Title -->
          <div class="flex flex-row justify-between items-center">
            <section-title  title="Assignments List"/>
            <div class="text-purple-primary">
              {{selectedDate}}
            </div>
          </div>
          <!-- Assignment List -->
          <assignment-list class="mt-4"/>
        </div>
      </div>
    </template>
    <template v-slot:bottomBar>
        <div class="w-full divide-y divide-transparent">
            <div class="py-2">
                <div class="grid grid-cols-2 divide-x divide-transparent">
                    <div class="text-left px-2">
                        Month
                        <select v-model="selectedMonth"
                                class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                            <option disabled value="">Select month</option>
                            <option v-for="month in months" :value="month.id">{{month.name}}</option>
                        </select>
                    </div>
                    <div class="text-left px-2">
                        Year
                        <select v-model="selectedYear"
                                class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                            <option disabled value="">Select year</option>
                            <option v-for="year in years" :value="year.year">{{year.year}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="text-center py-2">
                <select v-model="selectedSubjects"
                        class="pl-6 pr-2 py-5 mt-2  appearance-none border rounded-md border-none w-full bg-gray-secondary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary">
                    <option disabled value="">Select subject</option>
                    <option v-for="subject in subjects" :value="subject.id">{{subject.name}}</option>
                </select>
            </div>
            <div class="py-2">
                <div class="grid grid-cols-2 divide-x divide-transparent">
                    <div class="text-center">
                        <button @click="cancelFilter" class="w-full font-bold rounded-full text-purple-primary text-sm border-2 border-purple-primary bg-white py-3 px-1 flex flex-row justify-center">
                            <div class="w-5/7">
                                Cancel
                            </div>
                        </button>
                    </div>
                    <div class="text-center">
                        <button @click="filterAssignment" class="w-full font-bold rounded-full text-purple-primary text-sm bg-yellow-primary py-3 px-1 flex flex-row justify-center">
                            <div class="w-5/7">
                                Filter
                            </div>
                        <icon-base-two class="w-1/7">
                            <filter-icon/>
                        </icon-base-two>
                    </button></div>
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
import AssignmentCalendar from "@/views/teachers/TeacherAssignments/Index/Components/AssignmentCalendar";
import AssignmentList from "@/views/teachers/TeacherAssignments/Index/Components/AssignmentList";
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import moment from "moment";
import TeacherRepository from "../../../../repositories/TeacherRepository";
Vue.component('v-calendar', Calendar)
Vue.component('v-date-picker', DatePicker)

export default {
  name: "TeacherAssignments",
  components: {
    AssignmentCalendar,
    SectionTitle,
    FilterIcon,
    IconBaseTwo,
    PageTitle,
    DashboardLayout,
    AssignmentList
  },
  data() {
    return {
      days: [],
      // attributes:[{
      //   key: 'today',
      //   highlight: true,
      //   dates: new Date(),
      // }],
      date: new Date(),
      modal: false,
      selectedMonth: '',
      months: [
          {
              id: 1,
              name: 'January',
          },
          {
              id: 2,
              name: 'February',
          },
          {
              id: 3,
              name: 'March'
          },
          {
              id: 4,
              name: 'April'
          },
          {
              id: 5,
              name: 'May'
          },
          {
              id: 6,
              name: 'June'
          },
          {
              id: 7,
              name: 'July'
          },
          {
              id: 8,
              name: 'August'
          },
          {
              id: 9,
              name: 'September'
          },
          {
              id: 10,
              name: 'October'
          },
          {
              id: 11,
              name: 'November'
          },
          {
              id: 12,
              name: 'December'
          }
      ],
      selectedYear: '',
      years: [
          {
              year: 2020
          }
      ],
      subjects: '',
      selectedSubjects: '',
    };
  },
  computed: {
    selectedDate(){
        return moment(this.date).format('DD MMMM YYYY')
    },
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
    cancelFilter(){
       this.selectedSubjects = '',
       this.selectedYear ='',
       this.selectedMonth = ''

       this.modal = !this.modal
    },
    filterAssignment(){

    },
    getSubjects(){
        TeacherRepository.getTeacherSubjects()
            .then(response => {
                const data = response.data.subjects

                const numOfSubjects = data.length

                console.log(numOfSubjects)

                this.subjects = []
                for (let i = 0; i < numOfSubjects; i++) {

                    let item = data[i];

                    let subjectDetail = {
                        id: item.subject_id,
                        name: item.subject_name
                    }

                    this.subjects.push(subjectDetail)
                }
            })
    },
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
    mounted() {
      this.getSubjects()
    }
}
</script>

<style scoped>

</style>
