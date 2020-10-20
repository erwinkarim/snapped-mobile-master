<template>
  <teacher-dashboard  class="pt-10">
    <div class="px-5">
      <page-title class="w-3/4 pt-5">Assignments</page-title>
    </div>
  </teacher-dashboard>
</template>

<script>
import TeacherDashboard from "@/views/layout/TeacherDashboard";
import PageTitle from "@/components/PageTitle";
export default {
name: "TeacherAssignments",
  components: {PageTitle, TeacherDashboard}
}
</script>

<style scoped>

</style>
