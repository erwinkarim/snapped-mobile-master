<template>
  <layout-two page-title="Class">
        <subjects-list class="" :search="search"/>
  </layout-two>
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


export default {
  name: "TeacherClassDetails",
  components: {
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
