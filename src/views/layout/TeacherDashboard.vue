<template>
  <div class="h-screen">
    <div class="flex flex-col w-screen">
    <slot/>
    </div>
    <bottom-navbar/>
  </div>
</template>

<script>
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";
export default {
name: "TeacherDashboard",
  components: {BottomNavbar},
}
</script>

<style scoped>

</style>
