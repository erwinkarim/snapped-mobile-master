<template>
  <dashboard-layout >

    <template v-slot:pageHeader>
      <page-title-three>
        <template v-slot:leftAction>
          <nav-back class="w-5/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          New Assignment
        </template>
        <template v-slot:title>
          New Assignments
        </template>
<!--        <template v-slot:searchBar>-->
<!--          <div class="absolute w-1/12 mt-4 flex flex-row items-center justify-center ml-2">-->
<!--            <icon-base-two class=" w-5/7">-->
<!--              <magnifying-glass-icon stroke-color="purple-primary"/>-->
<!--            </icon-base-two>-->
<!--          </div>-->

<!--          <input v-model="search"-->
<!--                 class="pl-12 pr-2 py-3 mt-4  appearance-none border rounded rounded-xl border-none w-full bg-gray-tertiary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"-->
<!--                 id="username" type="text" placeholder="Search" autocomplete="off">-->
<!--        </template>-->
      </page-title-three>
    </template>

    <template v-slot:content>
      <subjects-list class="" :search="search"/>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import TeacherRepository from "@/repositories/TeacherRepository";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import SubjectsList from "@/views/teachers/TeacherClasses/SubjectsList";
import IconBase from "@/components/IconBase";
import FilterIcon from "@/components/icons/FilterIcon";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import NavBack from "@/components/NavBack";
import '@/directives/scroll'
import LayoutTwo from "@/views/students/StudentClass/Components/LayoutTwo";
import PageTitleThree from "@/components/PageTitleThree";
import IconBaseTwo from "@/components/IconBaseTwo";


export default {
  name: "TeacherClassDetails",
  components: {
    IconBaseTwo,
    PageTitleThree,
    LayoutTwo,
    NavBack,
    MagnifyingGlassIcon,
    FilterIcon,
    IconBase,
    SubjectsList,
    ArrowBackIcon,
    PageTitle,
    DashboardLayout
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
        return 'fixed top-26'
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
    }
  }
}
</script>

<style scoped>

</style>
