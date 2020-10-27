<template>
  <div class="">
    <div class="w-full bg-white flex flex-col fixed z-40">

      <div class="flex flex-row w-full justify-between pt-16 px-5">

        <nav-back class="w-1/3"/>

        <div class="text-lg font-bold text-purple-primary">
          Student List
        </div>

          <div class="relative w-1/6 h-full ">
            <icon-base class="absolute" icon-name="filter-icon" icon-color="white" view-box="-25 -5 60 55">
              <filter-icon/>
            </icon-base>
          </div>

      </div>

      <div class="px-5 pb-4 w-full mt-5">
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

    <students-list class="mt-48 mb-6" :search="search"/>

  </div>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import IconBase from "@/components/IconBase";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import NavBack from "@/components/NavBack";
import FilterIcon from "@/components/icons/FilterIcon";
import StudentsList from "@/views/teachers/TeachersStudents/StudentsList";

export default {
  name: "TeacherStudents",
  data() {
    return {
      search: ""
    }
  },
  components: {StudentsList, FilterIcon, NavBack, MagnifyingGlassIcon, IconBase, PageTitle, DashboardLayout}
}
</script>

<style scoped>

</style>
