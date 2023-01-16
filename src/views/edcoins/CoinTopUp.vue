<template>
  <dashboard-layout class="pt-5" :has-fixed-header="true" :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.home'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Top Up 
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <p>Top Up Interface Here</p>

      <div class="px-5 w-full md:px-10">
        <div class="mt-2 mb-3">
          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <router-link class="flex flex-row items-center h-full text-left text-purple-primary" :to="{ name:'coin.top_up_buy' }">
              <div class="flex flex-col px-2">
                  Top-Up Coins
              </div>
            </router-link>
          </div>
        </div>

        <div class="mt-2 mb-3">
          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <router-link class="flex flex-row items-center h-full text-left text-purple-primary" :to="{ name:'coin.top_up_redeem_marks' }">
              <div class="flex flex-col px-2">
                Redeem Marks
              </div>
            </router-link>
          </div>
        </div>

        <div class="mt-2 mb-3">
          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <router-link class="flex flex-row items-center h-full text-left text-purple-primary" :to="{ name: 'coin.top_up_gamified' }">
              <div class="flex flex-col px-2">
                Transfer EdCoins to Gamified 
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:bottomBar>
      <CoinsBottomNavBarVue />
    </template>

  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import SectionTitle from "@/components/SectionTitle";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import PageTitle from "@/components/PageTitle";
import CoinsBottomNavBarVue from "@/components/CoinsBottomNavBar.vue";

export default {
  name: "CoinTopUp",
  mounted() {
    console.log('coinTopUp mounted');
  },
  components: {
    DashboardLayout, SectionTitle, PageHeaderThree, NavBack, PageTitle,
    CoinsBottomNavBarVue,
  }
}
</script>
