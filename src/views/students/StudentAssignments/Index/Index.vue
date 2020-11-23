<template>
  <dashboard-layout>
    <template v-slot:pageHeader>
      <page-title title="Assignments"/>
    </template>

    <template v-slot:content>
      <div class="px-5">


        <!-- Section Title -->
        <div class="flex flex-row justify-between mt-8 items-center">
          <section-title title="Assignments Date"/>
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
            <section-title title="Assignments List"/>
            <div class="text-purple-primary">
              17 June 2020
            </div>
          </div>

          <!-- Assignment List -->
          <div class="mt-4">
            <assignment-card
                v-for="assignment in assignments"
                :key="assignment.assignmentID"
                :route="{name: 'student.assignments.show', params: { assignmentID: assignment.assignmentID }}"
                :assignment="assignment"
            />
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
import moment from "moment";
import StudentRepository from "@/repositories/StudentRepository";
import AssignmentRepository from "@/repositories/AssignmentRepository";

export default {
  name: "Index",
  data() {
    return {
      assignments: [],

      filters: {
        is_active: false,
        month: null,
        year: null,
        subjects: null
      }
    }
  },
  methods: {
    fetchData () {

      AssignmentRepository.all(this.filters)
          .then(response => {

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
                totalSubmission : item.number_of_submissions
              }

              this.assignments.push(assignmentDetail);
            }

          });

    }
  },

  mounted() {
    this.fetchData()
  },
  components: {AssignmentCard, DashboardLayout, FilterIcon, IconBaseTwo, SectionTitle, PageTitle}
}
</script>

<style scoped>

</style>
