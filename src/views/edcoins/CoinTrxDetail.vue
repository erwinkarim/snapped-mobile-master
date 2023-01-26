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
        <EdCoinTrxPeoplePillVue :people=from :model-name=trx.from_model_name :model-id=trx.from_model_id />

        <div class="overflow-hidden justify-between max-w-sm md:max-w-xl w-full text-6xl" >
          | 
        </div>


        <!-- transaction amount -->
        <div class="overflow-hidden justify-between px-3 max-w-sm md:max-w-xl h-full">
          <div class="text-6xl text-bold px-5 w-full md:px-10">
            {{ trx.amount }} Coins
          </div>
          <p class="mb-5 text-center">Transaction made on {{ new Date(trx.created_at).toLocaleString('en-GB') }} </p>
        </div>

        <div class="overflow-hidden justify-between max-w-sm md:max-w-xl w-full text-6xl" >
          &darr;
        </div>

        <!-- to -->
        <EdCoinTrxPeoplePillVue :people=to :model-name=trx.to_model_name :model-id=trx.to_model_id />
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
import CoinsRepository from "../../repositories/CoinsRepository";
import EdCoinTrxPeoplePillVue from "@/components/EdCoinTrxPeoplePill.vue";
import IconBaseTwo from "@/components/IconBaseTwo";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";

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
    CoinsBottomNavBarVue, EdCoinTrxPeoplePillVue,  ArrowDownIcon, IconBaseTwo,
  }
}
</script>

<style scoped>

</style>