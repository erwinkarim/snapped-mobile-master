<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-title title="Settings" />
    </template>

    <template v-slot:content>
      <div class="flex flex-row w-full items-center justify-center mt-10">
        <button @click="logout"
                class="w-2/3 mt-3 font-display text-white font-bold py-2 px-4 rounded-full h-14 text-lg inline-flex justify-center items-center bg-red-primary">
          Log Out
        </button>
      </div>
    </template>
  </dashboard-layout>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import DashboardLayout from "@/views/layout/DashboardLayout";

export default {
  name: "Settings",
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'login'})
    }
  },
  components: {DashboardLayout, PageTitle}
}
</script>

<style scoped>

</style>
