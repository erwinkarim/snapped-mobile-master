<template>

  <!-- ADJUST RELATIVE TOP -->
  <dashboard-layout :has-fixed-header="true">
    <template v-slot:pageHeader>
        <page-header-three :has-search-bar="true">
          <template v-slot:leftAction>
            <nav-back class="w-5/7" stroke-color="red-primary"/>
          </template>
          <template v-slot:mini-title>
            Student List
          </template>
        </page-header-three>
    </template>
    <template v-slot:content>
      <students-list :search="search" class="relative top-46 mb-24"/>
    </template>
  </dashboard-layout>

</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import IconBase from "@/components/IconBase";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import NavBack from "@/components/NavBack";
import FilterIcon from "@/components/icons/FilterIcon";
import StudentsList from "@/views/teachers/TeachersStudents/StudentsList";
import LayoutTwo from "@/views/students/StudentClass/Components/LayoutTwo";
import PageHeaderThree from "@/components/PageHeaderThree";

export default {
  name: "TeacherStudents",
  data() {
    return {
      search: ""
    }
  },
  components: {
    PageHeaderThree,
    LayoutTwo, StudentsList, FilterIcon, NavBack, MagnifyingGlassIcon, IconBase, PageTitle, DashboardLayout}
}
</script>

<style scoped>

</style>
