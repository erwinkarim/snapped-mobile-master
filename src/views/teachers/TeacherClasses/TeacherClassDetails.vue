<template>
  <teacher-dashboard class="pt-18">
    <div class="px-5">
      <div class="flex flex-row justify-between">

        <nav-back class="w-1/3"/>

        <div class="w-1/3 items-center flex flex-row justify-end">
          <div class="relative h-full w-1/2">
            <icon-base class="absolute" icon-name="filter-icon" icon-color="white" view-box="-15 -3 60 55">
              <FilterIcon/>
            </icon-base>
          </div>
          <div class="text-lg text-red-primary">
            Edit
          </div>
        </div>
      </div>

      <page-title class="w-3/4 pt-3">Class</page-title>

      <div class="relative w-full ">
        <div class="relative h-full pl-2">
          <icon-base class="absolute w-1/6 pt-4" icon-name="arrow-right-icon" icon-color="white" view-box="0 -2 60 55">
            <magnifying-glass-icon/>
          </icon-base>
        </div>
        <input v-model="search"
               class="pl-10 pr-2 py-3 mt-2  appearance-none border rounded rounded-xl border-none w-full bg-gray-tertiary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
               id="username" type="text" placeholder="Search" autocomplete="off">
      </div>
    </div>


    <subjects-list class="mt-4"/>
  </teacher-dashboard>
</template>

<script>
import TeacherDashboard from "@/views/layout/TeacherDashboard";
import PageTitle from "@/components/PageTitle";
import TeacherRepository from "@/repositories/TeacherRepository";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import SubjectsList from "@/views/teachers/TeacherClasses/SubjectsList";
import IconBase from "@/components/IconBase";
import FilterIcon from "@/components/icons/FilterIcon";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import NavBack from "@/components/NavBack";

export default {
  name: "TeacherClassDetails",
  components: {
    NavBack,
    MagnifyingGlassIcon,
    FilterIcon,
    IconBase,
    SubjectsList,
    ArrowBackIcon,
    PageTitle,
    TeacherDashboard
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style scoped>

</style>
