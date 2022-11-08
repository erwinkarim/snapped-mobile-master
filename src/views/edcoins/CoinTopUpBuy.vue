<template>
  <dashboard-layout class="pt-5" :has-fixed-header="true" :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.top_up'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Top Up 
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div class="px-5 w-full md:px-10">
        <div class="mt-2 mb-3">
          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <div class="flex flex-row items-center h-full text-left text-purple-primary">
              You can buy up to Y coins at RM1.00 each
            </div>
          </div>
        </div>
      </div>
      <div class="px-5 w-full md:px-10">
        <div class="mt-2 mb-3">
          <input type="number" class="border text-2xl text-right" value="0" />
          coins
        </div>
        <div>
          <button @click="requestTopUp" class="border px-5">Request</button>
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
  name: "CoinTopUpBuy",
  mounted() {
    console.log('coinTopUpBuy mounted');
  },
  methods: {
    requestTopUp() {
      console.log('request top up');
      
      // plan: send request to server, get ack from server, then move to ack page.
      // otherwise, give alert that it didn't work.
      this.$router.push({ name: 'coin.top_up_buy_ack'});
    }

  },
  components: {
    DashboardLayout, SectionTitle, PageHeaderThree, NavBack, PageTitle,
    CoinsBottomNavBarVue,
  }
}
</script>
