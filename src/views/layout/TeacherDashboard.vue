<template>
  <div class="h-screen">
    <slot/>
    <bottom-navbar/>
  </div>
</template>

<script>
import BottomNavbar from "@/components/BottomNavbar";
export default {
name: "TeacherDashboard",
  components: {BottomNavbar}
}
</script>

<style scoped>

</style>
