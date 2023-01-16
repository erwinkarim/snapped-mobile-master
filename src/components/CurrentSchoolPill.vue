
<template>
  <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
    <div class="flex flex-row items-center h-full text-left text-purple-primary">
      <div class="flex flex-col px-2 w-1/6">
        <SchoolIcon />
      </div>
      <div class="flex flex-col px-2 w-1/3">
        <div>School Name</div>
      </div>
    </div>
  </div>
</template>

<script>

import SchoolIcon from './icons/SchoolIcon.vue';

export default {
  name: "CurrentSchoolPill",
  mounted(){ 
    console.log("CurrentSchoolPill mounted");
  },
  components: {
    SchoolIcon,
  }
}

</script>

<style scoped>

</style>