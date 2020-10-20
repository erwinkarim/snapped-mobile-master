<template>
  <teacher-dashboard  class="pt-10">
    <div class="px-5">
      <page-title class="w-3/4 pt-5">Students</page-title>
    </div>
  </teacher-dashboard>
</template>

<script>
import TeacherDashboard from "@/views/layout/TeacherDashboard";
import PageTitle from "@/components/PageTitle";
export default {
name: "TeacherStudents",
  components: {PageTitle, TeacherDashboard}
}
</script>

<style scoped>

</style>
