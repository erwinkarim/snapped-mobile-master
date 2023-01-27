<template>
  <dashboard-layout class="pt-5" :has-fixed-header="true" :has-custom-bottom-bar="true">
    <template v-slot:pageHeader>
      <page-header-three :bottom-padding="5">
        <template v-slot:leftAction>
          <nav-back :to="{name: 'coin.top_up_redeem_marks'}" class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          Redeem Marks for Coins Attempt
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="h-30">Empty Space</div>
      <div class="px-5 w-full md:px-10">
        <div class="mb-3 overflow-hidden justify-between max-w-sm md:max-w-xl w-full h-full rounded rounded-xl bg-gray-secondary">
          <div class="flex flex-row items-center h-full text-left text-purple-primary p-3">
            <div class="flex w-full text-2xl text-center">{{ status[status_condition] }} </div>
            </div>
          <div class="flex flex-row items-center h-full text-left text-purple-primary p-3 border-t-2 border-grey-500">
            <div class="flex">{{  status_explainer[status_condition] }}</div>
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
  name: "CoinTopUpMarkAttempt",
  data() {
    return {
      mark: {},
      status: ['ATTEMPT', 'SUCCESS', 'FAILED'],
      status_explainer: [
        'Attempting to redeem coins',
        'Redeem coin attempt successful',
        'Failed to redeem coins. Either it already has been redeemed or there is an error. Refresh to try again.'
      ],
      status_condition: 0,
    }
  },
  mounted(){
    // get mark info
    CoinsRepository.marksForCoinsDetail(this.$route.params.mark_id).then((res) => {
      this.mark = res.data.mark[0];
    })


    // attempt to redeem and give a success or failed status
    CoinsRepository.marksForCoinsAttempt(this.$route.params.mark_id).then((res) => {
      console.log('res', res);
      this.status_condition=1;
    }).catch((res) => {
      console.log('failed')
      this.status_condition=2;
    });
  },
  components: {
    DashboardLayout, SectionTitle, PageHeaderThree, NavBack, PageTitle,
    CoinsBottomNavBarVue,
  }
}
</script>