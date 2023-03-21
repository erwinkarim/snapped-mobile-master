
<template>
  <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
    <div class="flex flex-row items-center h-full text-left text-purple-primary">
      <div class="flex flex-col px-2 w-1/6">
        <SchoolIcon />
      </div>
      <div class="flex flex-col px-2 w-full">
        <div>{{  studentInfo.school.name }}</div>
      </div>
    </div>
    <div class="flex flex-row items-center h-full text-left text-purple-primary mt-4">
      <div class="flex flex-col px-2 w-1/6">
        <SchoolIcon />
      </div>
      <!-- Every student is on EdSchool -->
      <div class="flex flex-col px-2 w-full">
        <div>EdSchool</div>
      </div>
    </div>
  </div>
</template>

<script>

import SchoolIcon from './icons/SchoolIcon.vue';
import StudentRepository from '@/repositories/StudentRepository.js';

export default {
  name: "CurrentSchoolPill",
  mounted(){ 
    console.log("CurrentSchoolPill mounted");
    StudentRepository.getStudentDetails().then((res) => {
      this.studentInfo = res.data.data[0];
    });
  },
  data() {
    return {
      studentInfo: {},
    };
  },
  components: {
    SchoolIcon,
  }
}

</script>

<style scoped>

</style>