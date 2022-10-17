<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="bottomBarClass" >

    <template v-slot:content>
      <div class="flex flex-col px-5 w-full md:px-10">
        <div class="w-2/7">
          <icon-base-two>
            <AppLogo/>
          </icon-base-two>
        </div>
      </div>

      <div class="px-5 w-full md:px-10">
        <!-- total marks -->
        <div class="mt-2 mb-3">
          <section-title class="mb-5 text-left" title="Marks"/>
          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <div class="flex flex-row items-center h-full text-left text-purple-primary">
              <div class="flex flex-col px-2 w-1/8">
                <SquareCheckIcon />
              </div>
              <div class="flex flex-col px-2 w-1/3">
                1234 Marks
              </div>
            </div>
          </div>
        </div>


        <!-- total coins -->
        <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
          <div class="flex flex-row items-center h-full text-left text-purple-primary">
            <div class="flex flex-col px-2 w-1/8">
              <CoinsIcon />
            </div>
            <div class="flex flex-col px-2 w-1/3">
              1234 Coins
            </div>
          </div>
        </div>
      </div>

      <div class="px-5 w-full md:px-10">
        <!-- transaction history -->
        <p>transaction history here</p>
        <div class="mt-2 mb-3">
          <p>For demo, put a slider on how many trasactions to handle 0 to 1000 trx</p>
          <section-title class="mb-5 text-left" title="Transaction History" />
          <router-link :to="{ name: 'coin.trxDetail', params: { trxID: 1 }}">
            <EdCoinTransactionPill />
          </router-link>
          <router-link :to="{ name: 'coin.trxDetail', params: { trxID: 2 }}">
            <EdCoinTransactionPill />
          </router-link>
          <router-link :to="{ name: 'coin.trxDetail', params: { trxID: 3 }}">
            <EdCoinTransactionPill />
          </router-link>
        </div>
      </div>

    </template>

    <template v-slot:bottomBar>
      <section id="bottom-navigation">
        <div id="tabs" class="flex flex-row md:max-w-2xl h-full items-center justify-around mx-auto md:w-6/7">
          <router-link v-for="tab in tabs"
                      :key="tab.routeName"
                      :to="{name: tab.routeName}"
                      class=" w-1/5 pt-1 flex flex-row justify-center items-center"
                      exact
          >
            <div class="w-5/7 md:w-4/7">
              <bottom-navbar-icon-base :tab-name="tab.tabName" :icon="tab.icon" />
            </div>
          </router-link>
        </div>
      </section>
    </template>
  </dashboard-layout>

</template>

<script>
import AppLogo from "@/components/icons/AppLogo";
import DashboardLayout from "@/views/layout/DashboardLayout";
import IconBaseTwo from "@/components/IconBaseTwo";
import SectionTitle from "@/components/SectionTitle";
import EdCoinTransactionPill from "../../components/EdCoinTransactionPill.vue";
import SquareCheckIcon from "../../components/icons/SquareCheckIcon.vue";
import IconBase from "../../components/IconBase.vue";
import CoinsIcon from "../../components/icons/CoinsIcon.vue";
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";
import BottomNavbarIconBase from "@/components/BottomNavbar/BottomNavbarIconBase";
import coins_tabs from "@/components/BottomNavbar/coins_tabs";

export default {
  name: "CoinHome",
  data() {
    return {
      bottomBarClass: true,
      tabs: []
    };
  },
  mounted() {
    console.log('CoinHome Mounted');

    this.tabs = coins_tabs;

    // for demo: generate random data

    /* 
      for production: check auth and get info
      - current marks and coins ledger
      - recent transactions 
    */

  },
  components: {
    AppLogo, DashboardLayout, IconBaseTwo, SectionTitle, EdCoinTransactionPill,
    IconBase, SquareCheckIcon, CoinsIcon, BottomNavbar, BottomNavbarIconBase,
}
}

</script>

<style scoped>

</style>