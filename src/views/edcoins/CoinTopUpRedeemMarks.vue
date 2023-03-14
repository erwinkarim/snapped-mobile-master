<template>
  <dashboard-layout :has-fixed-header="true" :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.top_up'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Redeem Marks for Coins
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div class="px-5 w-full md:px-10">
        <div class="mt-2 mb-3">
          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <div class="flex flex-row items-center h-full text-left text-purple-primary">
              You can redeem up to {{ availableMarks }} coins
            </div>
          </div>
        </div>
      </div>
      <div class="px-5 w-full md:px-10">
        <div v-for="mark in marks" class="mb-3 overflow-hidden justify-between max-w-sm md:max-w-xl w-full h-full rounded rounded-xl bg-gray-secondary">
          <div class="flex flex-row items-center h-full text-left text-purple-primary p-3">
            <div class="flex w-full text-lg text-center">Assignment: {{ mark.title }} ({{ mark.assignment_id }}) </div>
          </div>
          <div class="flex flex-row items-center h-full text-left text-purple-primary">
            <div class="w-1/2 text-center">Marks<br /> <span class="text-4xl">{{ mark.final_marks }}</span></div>
            <div class="w-1/2 text-center">Amount Redeemed<br /> <span class="text-4xl">{{ mark.amount_redeemed || 0 }}</span> </div>
          </div>
          <div class="flex flex-row items-center h-full text-left text-purple-primary p-3 border-t-1 border-gray-500">
            <router-link class="w-1/2 text-center border-r-1 border-gray-500" :to="{ name: 'coin.top_up_redeem_marks_detail', params: { mark_id: mark.id } }">Detail</router-link>
            <router-link class="w-1/2 text-center" :to="{ name: 'coin.top_up_redeem_marks_attempt', params: { mark_id: mark.id } }">Redeem</router-link>
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
import CoinsRepository from "@/repositories/CoinsRepository";

export default {
  data() {
    return {
      marks: [],
    };
  },
  name: "CoinTopRedeemMarks",
  mounted() {
    // get a list of assignments
    console.log('coinTopUpBuy mounted');
    CoinsRepository.marksForCoinsList().then((response) => {
      console.log(response);
      this.marks = response.data.marks;
    });
  },
  computed: {
    availableMarks(){
      if(this.marks.length === 0){
        return 0;
      } else {
        return this.marks.reduce((a, v) => {
          if(v.amount_redeemed === null){
            return a += v.final_marks;
          } else {
            return a;
          }
        }, 0);
      }
    },
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
