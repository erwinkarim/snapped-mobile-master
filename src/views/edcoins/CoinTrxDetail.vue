<template>
  <dashboard-layout class="pt-5">
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.home'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          TRX Detail
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <!-- transaction amount -->
      <div class="px-5 w-full md:px-10">
        <page-title title="X Coins"/>
      </div>

      <!-- to from -->
      <div class="px-5 w-full md:px-10">
        <section-title class="mb-5 text-left" title="From X to Y"/>
      </div>

      <!-- date/time -->
      <div class="px-5 w-full md:px-10">
        <section-title class="mb-5 text-left" title="10-Oct-2022 08:24am" />
      </div>
    </template>
  </dashboard-layout>
</template>

<script>
import AppLogo from "@/components/icons/AppLogo";
import DashboardLayout from "@/views/layout/DashboardLayout";
import SectionTitle from "@/components/SectionTitle";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import PageTitle from "@/components/PageTitle";

export default {
  name: 'CoinTrxDetail',
  mounted() {
    // for demo: generate random data

    /*
      for production: auth and get info
      - auth check
      - trx detail 
    */

  },
  components: {
    DashboardLayout, SectionTitle, PageHeaderThree, NavBack, PageTitle,
  }
}
</script>

<style scoped>

</style>