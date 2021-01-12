<template>
  <dashboard-layout>
    <template v-slot:pageHeader>
      <page-header-three
          :has-search-bar="true"
          :has-bottom-border="true"
          @search="handleSearch"
      >
        <template v-slot:leftAction>
          <nav-back class="w-2/7 md:w-1/5" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Classmate List
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="relative top-46 md:w-full mb-24">
        <router-link v-for="student in filteredStudents"
                     :key="student.id"
                     :to="{name : 'student.profile.show', params: {studentID: student.student_id} }"
             class="text-left px-5 py-2 md:py-4 flex flex-row w-full border-b-1 items-center bg-white">

          <div class="flex flex-row items-center truncate w-11/12">
            <icon-base-two class=" w-1/6">
              <profile-photo/>
            </icon-base-two>
            <div class="ml-5 text-purple-primary w-5/6 mr-2 truncate pr-4">
              {{ student.name }}
            </div>
          </div>
        </router-link>
      </div>

    </template>
  </dashboard-layout>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import PageTitle from "@/components/PageTitle";
import LayoutTwo from "@/views/students/StudentClass/Components/LayoutTwo";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import StudentRepository from "@/repositories/StudentRepository";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";

export default {
  name: "ClassClassmates",
  data() {
    return {
      search: '',
      students: [],
      filteredStudents: []
    }
  },
  watch: {
    'search': 'filterList'
  },
  methods: {
    getClassmates() {
      StudentRepository.getClassmates()
          .then(response => {
            let data = response.data;

            this.students = data.students;
            this.filteredStudents = data.students;

            this.className = data.class_name;
          })
    },
    handleSearch(value) {
      this.search = value;
    },
    filterList() {

      // Copy original results into filterSubjects
      this.filteredStudents = JSON.parse(JSON.stringify(this.students));

      this.filteredStudents = this.filteredStudents.filter(student => {
        return (student.name.toLowerCase()).includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    this.getClassmates();
  },
  components: {
    NavBack,
    PageHeaderThree,
    DashboardLayout, ProfilePhoto, MagnifyingGlassIcon, LayoutTwo, PageTitle, FilterIcon, IconBaseTwo
  }
}
</script>

<style scoped>

</style>
