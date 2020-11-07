<template>
  <dashboard-layout class="">
    <template v-slot:content>
      <router-view/>
    </template>
  </dashboard-layout>
</template>

<script>
import NavBack from "@/components/NavBack";
import IconBase from "@/components/IconBase";
import FilterIcon from "@/components/icons/FilterIcon";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import PageTitle from "@/components/PageTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import DashboardLayout from "@/views/layout/DashboardLayout";

export default {
  name: "StudentClass",
  components: {DashboardLayout, IconBaseTwo, PageTitle, MagnifyingGlassIcon, FilterIcon, IconBase, NavBack}
}
</script>

<style scoped>

</style>
