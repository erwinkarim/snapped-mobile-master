<template>
  <dashboard-layout :has-fixed-header="true" :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.top_up_redeem_marks'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Redeem Marks for Coins Detail
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div class="px-5 w-full md:px-10">
        <div class="mb-3 overflow-hidden justify-between max-w-sm md:max-w-xl w-full h-full rounded rounded-xl bg-gray-secondary">
          <div class="flex flex-row items-center h-full text-left text-purple-primary p-3">
          <div class="flex w-full text-2xl text-center">Assignment: {{ mark.title }} ({{ mark.assignment_id }}) </div>
        </div>
        <div class="flex flex-row items-center h-full text-left text-purple-primary border-t-2 border-grey-500 p-4">
          <div class="w-full">Assignment details here</div>
        </div>
        <div class="flex flex-row items-center h-full text-left text-purple-primary border-t-2 border-grey-500 p-4">
          <div class="w-1/2 text-center">Marks<br /> <span class="text-4xl">{{ mark.final_marks }}</span></div>
          <div class="w-1/2 text-center">Amount Redeemed<br /> <span class="text-4xl">{{ mark.amount_redeemed || 0 }}</span> </div>
        </div>
        <div class="flex flex-row items-center h-full text-left text-purple-primary border-t-2 border-grey-500">
          <div class="p-3">Status: </div>
        </div>
        <div class="flex flex-row items-center h-full text-left text-purple-primary border-t-2 border-grey-500">
          <router-link class="text-center w-full p-3" :to="{ name: 'coin.top_up_redeem_marks_attempt', params: { mark_id: $route.params.mark_id } }">Redeem</router-link>
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
import CoinsRepository from "@/repositories/CoinsRepository";
import DashboardLayout from "@/views/layout/DashboardLayout";
import SectionTitle from "@/components/SectionTitle";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import PageTitle from "@/components/PageTitle";
import CoinsBottomNavBarVue from "@/components/CoinsBottomNavBar.vue";

export default {
  name: "CoinTopUpMarkDetail",
  data() {
    return {
      mark: {},
    };
  },
  mounted(){
    // load up the assignment / mark details
    CoinsRepository.marksForCoinsDetail(this.$route.params.mark_id).then((res) => {
      // console.log(res);
      this.mark = res.data.mark[0];
    });
  },
  components: {
    DashboardLayout, SectionTitle, PageHeaderThree, NavBack, PageTitle,
    CoinsBottomNavBarVue,
  }
}
</script>