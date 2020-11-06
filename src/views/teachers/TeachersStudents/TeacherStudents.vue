<template>

  <dashboard-layout>
    <template v-slot:content>
      <students-list :search="search"/>
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

export default {
  name: "TeacherStudents",
  data() {
    return {
      search: ""
    }
  },
  components: {LayoutTwo, StudentsList, FilterIcon, NavBack, MagnifyingGlassIcon, IconBase, PageTitle, DashboardLayout}
}
</script>

<style scoped>

</style>
