<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-title title="Report Card"/>
    </template>
    <template v-slot:content>
      <div class="w-full px-7 mt-3">
        <p>Put some reports here. Somehow.</p>
      </div>
    </template>
  </dashboard-layout>
</template>

<script>

import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import StudentRepository from "@/repositories/StudentRepository";


export default{
  name: "ReportCard",
  mounted(){
    console.log('Report Card Mounted');
    StudentRepository.getReportCard().then((response) => {
      console.log('report card loaded', response);
    });
  },
  components: {
    DashboardLayout, PageTitle,  
  },
}
</script>

<style scoped>
</style>