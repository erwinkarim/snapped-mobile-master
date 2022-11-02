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
      <p>Transfer EdCoins to Gamified here</p>
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
  name: "CoinTopUpGamified",
  mounted() {
    console.log('coinTopUpBuy mounted');
  },
  components: {
    DashboardLayout, SectionTitle, PageHeaderThree, NavBack, PageTitle,
    CoinsBottomNavBarVue,
  }
}
</script>
