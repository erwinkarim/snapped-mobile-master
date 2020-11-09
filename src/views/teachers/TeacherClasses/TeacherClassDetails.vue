<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-header-three :has-search-bar="true" :has-scroll-animation="true">
        <template v-slot:leftAction>
          <nav-back class="w-5/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          New Assignment
        </template>
        <template v-slot:title>
          New Assignments
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <subjects-list class="" :search="search"/>
    </template>
  </dashboard-layout>
</template>

<script>

import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import SubjectsList from "@/views/teachers/TeacherClasses/SubjectsList";
export default {
  name: "TeacherClassDetails",
  components: {
    SubjectsList,
    NavBack,
    PageHeaderThree,
    DashboardLayout
  },
  data() {
    return {
      search: ''
    }
  },
}
</script>

<style scoped>

</style>
