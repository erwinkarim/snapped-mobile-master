<template>
  <dashboard-layout class="pt-5">
    <template v-slot:content>
      <p>Student School Here</p>
      <table class="border-1">
        <tbody v-for="(value,key) in school">
          <tr>
            <td>{{ key }}</td><td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";

export default {
  name: "StudentSchools",
  data() {
    return {
      school: this.$store.getters['getAuthUser'].school,
    }
  },
  components: {
    DashboardLayout,
  }
}
</script>

<style scoped>

</style>