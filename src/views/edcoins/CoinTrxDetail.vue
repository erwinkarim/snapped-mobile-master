<template>
  <dashboard-layout class="" :has-custom-bottom-bar="true">
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
      <div class="px-5 w-full md:px-10">

        <!-- from -->
        <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
          <div class="flex flex-col items-center h-full text-left text-purple-primary">
            <div class="flex w-full border-b-2 border-grey-500">From Details:</div>
            <div class="flex px-2 w-full">
              {{ from }}
            </div>
          </div>
        </div>

        <!-- transaction amount -->
        <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full">
          <div class="text-6xl text-bold px-5 w-full md:px-10">
            {{ trx.amount }} Coins
          </div>
          <p class="mb-5 text-left">Transaction made on {{ (trx.created_at).toLocaleString('en-GB') }} </p>
        </div>

        <!-- to -->
        <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
          <div class="flex flex-col items-center h-full text-left text-purple-primary">
            <div class="flex w-full border-b-2 border-grey-500">To Details:</div>
            <div class="flex px-2 w-full">
              {{ to }}
            </div>
          </div>
        </div>
      </div>
      <div class="h-30">Empty Space</div>

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
import CoinsRepository from "../../repositories/CoinsRepository";

export default {
  name: 'CoinTrxDetail',
  data() {
    // demo data
    // will handle exceptions in the future. 

    return {
      trx: {},
      from: {},
      to: {},
      trxTime: Date(),
    };
  }, 
  mounted() {
    CoinsRepository.coinTrxDetail(this.$route.params.trxID).then((res) => {
      console.log('res', res);
      this.trx = res.data.trx;
      this.from = res.data.from;
      this.to = res.data.to;
    });
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