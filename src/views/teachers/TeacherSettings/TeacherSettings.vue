<template>
  <div  class="pt-10">
    <div class="px-5">
      <page-title class="w-3/4 pt-5">Settings</page-title>
    </div>

    <!-- TODO: Implement Logout-->

    <div class="flex flex-row w-full items-center justify-center mt-10">
      <button @click="logout"
              class="w-2/3 mt-3 font-display text-white font-bold py-2 px-4 rounded-full h-14 text-lg inline-flex justify-center items-center bg-red-primary">
        Log Out
      </button>
    </div>
  </div>
</template>

<script>

import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";

export default {
name: "TeacherSettings",
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'login'})
    }
  },
  components: {PageTitle, DashboardLayout}
}
</script>

<style scoped>

</style>
