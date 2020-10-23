<template>
  <div class="h-screen">
    <div class="flex flex-col w-screen mb-24">
    <slot/>
    </div>
    <bottom-navbar/>
  </div>
</template>

<script>
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";
export default {
name: "DashboardLayout",
  components: {BottomNavbar},
}
</script>

<style scoped>

</style>
