<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-header-three
          :has-search-bar="true"
          :has-scroll-animation="true"
          @search="handleSearch"
      >
        <template v-slot:leftAction>
          <nav-back class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          <div class="truncate">
            {{ className }}
          </div>
        </template>
        <template v-slot:title>
          <div class="truncate">
            {{ className }}
          </div>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <subjects-list class="w-full" :search="search"/>
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
  props: {
    className: {
      type: String,
      default: 'Class'
    }
  },
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
  methods: {
    handleSearch (value) {
      this.search = value
    }
  }
}
</script>

<style scoped>

</style>
