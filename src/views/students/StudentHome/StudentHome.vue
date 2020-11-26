<template>
  <dashboard-layout class=" pt-5">
    <template v-slot:content>
      <div class="px-5">
        <div class="w-3/4">
          <icon-base width="190" height="70" icon-name="app-logo" view-box="0 0 320 18">
            <app-logo/>
          </icon-base>
        </div>
        <user-profile/>
      </div>

      <div class="px-5">

        <!-- SECTION: CLASSES -->
        <div class="mt-5">
          <div class="text-left mb-3">
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

export default {
  name: "StudentHome",
  data() {
    return {
      assignments: [],
    }
  },
  methods: {
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
  },
  components: {AssignmentCard, DashboardLayout, ActiveAssignment, SectionTitle, UserProfile, AppLogo, IconBase},
}
</script>

<style scoped>

</style>
