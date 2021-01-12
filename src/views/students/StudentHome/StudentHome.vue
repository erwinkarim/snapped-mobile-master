<template>
  <dashboard-layout class="pt-5">
    <template v-slot:content>


      <div class="flex flex-col px-5 w-full md:px-10">
        <div class="w-2/7">
          <icon-base-two>
            <AppLogo/>
          </icon-base-two>
        </div>
        <user-profile />
      </div>

      <div class="px-5 w-full md:px-10">

        <!-- SECTION: SUMMARY -->
        <div class="mt-2 mb-3">
            <section-title class="mb-5 text-left" title="Summary"/>

          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <div class="flex flex-row items-center h-full text-left text-purple-primary">
              <div class="flex flex-col px-2 w-1/3">
                <div class="py-2 font-bold border-b-1">{{ numOfNewAssignments }}</div>
                <div class="py-2 mb-1 h-12 text-xs-plus">
                  New Assignments
                </div>
              </div>
              <div class="flex flex-col px-2 w-1/3 border-l-1 border-r-1">
                <div class="py-2 font-bold border-b-1">{{ numOfDueSoonAssignments }}</div>
                <div class="py-2 mb-1 h-12 text-xs-plus">Due Soon Assignments</div>
              </div>
              <div class="flex flex-col px-2 w-1/3">
                <div class="py-2 font-bold border-b-1">{{ numOfOverdueAssignments }}</div>
                <div class="py-2 mb-1 h-12 text-xs-plus">Overdue Assignments</div>
              </div>
            </div>
          </div>

        </div>

        <!-- SECTION: ASSIGNMENTS -->
        <div class="mt-5">
          <div class="mb-3 text-left w-full">
            <section-title class="mb-5" title="Active Assignments"/>
          </div>
          <assignment-card
              v-for="assignment in assignments"
              :key="assignment.assignmentID"
              :route="{name: 'student.assignments.show', params: { assignmentID: assignment.assignmentID }}"
              :assignment="assignment"
          />
        </div>
      </div>
    </template>

  </dashboard-layout>
</template>

<script>
import IconBase from "@/components/IconBase";
import AppLogo from "@/components/icons/AppLogo";
import UserProfile from "@/components/UserProfile";
import SectionTitle from "@/components/SectionTitle";
import ActiveAssignment from "@/views/students/StudentHome/Components/ActiveAssignment";
import DashboardLayout from "@/views/layout/DashboardLayout";
import AssignmentCard from "@/components/AssignmentCard";
import StudentRepository from "@/repositories/StudentRepository";
import AssignmentRepository from "@/repositories/AssignmentRepository";
import IconBaseTwo from "@/components/IconBaseTwo";

export default {
  name: "StudentHome",
  data() {
    return {
      assignments: [],
      numOfNewAssignments: 0,
      numOfDueSoonAssignments: 0,
      numOfOverdueAssignments: 0

    }
  },
  methods: {
    fetchSummary() {
      StudentRepository.getUnsubmittedAssignmentSummary()
          .then(response => {

            this.numOfNewAssignments = response.data.num_of_new_assignments
            this.numOfDueSoonAssignments = response.data.num_of_due_soon_assignments
            this.numOfOverdueAssignments = response.data.num_of_overdue_assignments
          })
    },
    getAssignments: function () {

      AssignmentRepository.active()
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
              }

              this.assignments.push(assignmentDetail);
            }

          })
    },
  },
  mounted() {
    this.getAssignments()
    this.fetchSummary()
  },
  components: {
    IconBaseTwo,
    AssignmentCard, DashboardLayout, ActiveAssignment, SectionTitle, UserProfile, AppLogo, IconBase
  },
}
</script>

<style scoped>

</style>
