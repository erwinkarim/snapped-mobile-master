<template>
  <div class="h-screen">

    <div class="flex flex-row">
      <slot name="pageHeader"/>
    </div>

    <div class="flex flex-col w-screen mb-24">
      <slot name="content"/>
    </div>

    <div v-if="isCustom" class="flex flex-row h-full items-center justify-around">
      <slot name="bottomBar"/>
    </div>
    <div v-else>
      <bottom-navbar/>
    </div>

  </div>
</template>

<script>
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";

export default {
  name: "DashboardLayout",
  props: {
    isCustom: {
      type: Boolean,
      default: false
    }
  },
  components: {BottomNavbar},
}
</script>

<style scoped>

</style>
