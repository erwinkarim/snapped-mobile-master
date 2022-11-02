<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="true">
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
      <div class="h-30">Empty Space</div>
      <!-- transaction amount -->
      <div class="text-6xl text-bold px-5 w-full md:px-10">
        {{ amount }} Coins
      </div>

      <!-- to from -->
      <div class="px-5 w-full md:px-10">
        <p class="mb-5 text-left">From {{ from }} to {{ to }}.</p>
      </div>

      <!-- date/time -->
      <div class="px-5 w-full md:px-10">
        <p class="mb-5 text-left">Transaction made on {{ (trxTime).toLocaleString('en-GB') }} </p>
      </div>
    </template>

    <template v-slot:bottomBar>
      <CoinsBottomNavBarVue />
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
import CoinsBottomNavBarVue from "@/components/CoinsBottomNavBar.vue";

export default {
  name: 'CoinTrxDetail',
  data() {
    // demo data
    // will handle exceptions in the future. 

    return {
      amount: parseInt(Math.random() * 100),
      trxType: "trade", 
      from: "Alice",
      to: "You",
      trxTime: Date(),
    };
  }, 
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
    CoinsBottomNavBarVue,
  }
}
</script>

<style scoped>

</style>