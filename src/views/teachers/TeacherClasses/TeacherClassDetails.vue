<template>
  <teacher-dashboard >

    <div class="w-full bg-white flex flex-col z-40"  v-scroll="handleScroll">

      <div :class="headerClass" class="flex flex-row w-full justify-between fixed pt-16 px-5 bg-white">

        <nav-back class="w-1/3"/>

        <div :class="pageTitleTwoClass" class="text-xl font-bold text-purple-primary">
          Class
        </div>

        <div class="w-1/3 items-center flex flex-row justify-end">
          <div class="relative w-1/2 h-full ">
            <icon-base class="absolute" icon-name="filter-icon" icon-color="white" view-box="-10 -5 60 55">
              <FilterIcon/>
            </icon-base>
          </div>
          <div class="text-lg text-right text-red-primary">
            Edit
          </div>
        </div>

      </div>

      <page-title :class="pageTitleClass" class="w-3/4 px-5 mt-28">Class</page-title>

      <div :class="searchBarClass" class="px-5 pb-4 w-full  bg-white">
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

    <subjects-list class=""/>

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
import '@/directives/scroll'


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
      search: '',
      isScrolledDownOne: false,
      isScrolledDownTwo: false,
      setStickySearchBar: false
    }
  },
  computed: {
    pageTitleClass: function() {

      if (this.isScrolledDownOne) {
        return 'transition-opacity duration-100 opacity-0'
      }
      if (this.isScrolledDownTwo) {
        return 'transition-opacity duration-100 opacity-0'
      }

      return 'transition-opacity duration-400 opacity-100'

    },
    pageTitleTwoClass: function() {
      if (this.isScrolledDownTwo) {
        return 'transition-opacity duration-400 opacity-100'
      }

      return 'transition-opacity duration-100 opacity-0'
    },
    searchBarClass: function() {
      if (this.setStickySearchBar) {
        return 'fixed top-28'
      }

      return ''
    },
    headerClass: function() {
      if (this.isScrolledDownTwo) {
        return 'pb-6'
      }
    },
  },
  methods: {
    handleScroll: function (evt, el) {
      this.isScrolledDownOne  = window.scrollY > 32
      this.isScrolledDownTwo  = window.scrollY > 43
      this.setStickySearchBar  = window.scrollY > 54
    },
  }
}
</script>

<style scoped>

</style>
