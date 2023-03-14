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
      <div v-if="status === 0">
        <div>Loading ...</div>
      </div>
      <div v-else-if="status === 1" class="px-5 w-full md:px-10">

        <!-- from -->
        <EdCoinTrxPeoplePillVue :people=from :model-name=trx.from_model_name :model-id=trx.from_model_id />

        <div class="overflow-hidden justify-between max-w-sm md:max-w-xl w-full text-6xl" >
          <span v-if="trx.amount > 0">|</span>
          <span v-else>&uarr;</span>
        </div>


        <!-- transaction amount -->
        <div class="overflow-hidden justify-between px-3 max-w-sm md:max-w-xl h-full">
          <div class="text-6xl text-bold px-5 w-full md:px-10">
            {{ trx.amount < 0 ? -(trx.amount) : trx.amount }} Coins
          </div>
          <p class="mb-5 text-center">Transaction made on {{ new Date(trx.created_at).toLocaleString('en-GB') }} </p>
        </div>

        <div class="overflow-hidden justify-between max-w-sm md:max-w-xl w-full text-6xl" >
          <span v-if="trx.amount > 0">&darr;</span>
          <span v-else>|</span>
        </div>

        <!-- to -->
        <EdCoinTrxPeoplePillVue :people=to :model-name=trx.to_model_name :model-id=trx.to_model_id />
      </div>
      <div v-else-if="status === 2">
        <div>Error</div>
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
      // status: 0 - loading, 1 - success, 2 - error, 3 - unauthorized
      status: 0,
      trx: {},
      from: {},
      to: {},
      trxTime: Date(),
    };
  }, 
  mounted() {
    CoinsRepository.coinTrxDetail(this.$route.params.trxID).then((res) => {
      this.status = 1;
      this.trx = res.data.trx;
      this.from = res.data.from;
      this.to = res.data.to;
    }).catch((res) => {
      // if status is 400
      console.log('error', res);
      this.status = 2;

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