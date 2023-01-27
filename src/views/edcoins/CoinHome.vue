<template>
  <dashboard-layout class="pt-5" :has-custom-bottom-bar="true" >

    <template v-slot:content>
      <div class="flex flex-col px-5 w-full md:px-10">
        <router-link class="w-2/7" :to="{ name: homeURL }">
          <icon-base-two>
            <AppLogo/>
          </icon-base-two>
        </router-link>
      </div>

      <!-- total coins -->
      <div class="px-5 w-full md:px-10">
        <section-title class="text-left" title="Coins"/>
        <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
          <div class="flex flex-row items-center h-full text-left text-purple-primary">
            <div class="flex flex-col px-2 w-1/8">
              <CoinsIcon />
            </div>
            <div class="flex flex-col px-2 w-3/8">
              {{ trxResult.length === 0 ? 0 : trxResult.at(0).balance }} Coins
            </div>
            <router-link class="flex flex-col px-2 w-1/2 text-right" :to="{ name: 'coin.top_up' }">
              Top-Up
            </router-link>
          </div>
        </div>
      </div>

      <!-- total marks -->
      <div class="px-5 w-full md:px-10">
        <div class="mt-3 mb-3">
          <section-title class="text-left" title="Marks"/>
          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <div class="flex flex-row items-center h-full text-left text-purple-primary">
              <div class="flex flex-col px-2 w-1/8">
                <SquareCheckIcon />
              </div>
              <div class="flex flex-col px-2 w-3/8">
                {{ availableMarks }} Marks Available
              </div>
              <router-link class="flex flex-col px-2 w-1/2 text-right" :to="{ name: 'coin.top_up_redeem_marks' }">
                Redeem
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- transaction history -->
      <div class="px-5 w-full md:px-10">
        <div class="mt-2 mb-3">
          <p>Showing {{ trxResult.length }} transaction(s)</p>
        </div>

        <div class="mt-2 mb-3">
          <section-title class="mb-5 text-left" title="Transaction History" />
          <div v-if="trxResult.length === 0">
            No transactions
          </div>
          <div v-else>
            <div v-for="trx in trxResult">
              <router-link :to="{ name: 'coin.trxDetail', params: { trxID: trx.id }}">
                <EdCoinTransactionPill :trxID=trx.id :trxAmount=trx.amount  :date=trx.created_at />
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="h-30">Empty Space</div>

    </template>

    <template v-slot:bottomBar>
      <CoinsBottomNavBar />
    </template>
  </dashboard-layout>
</template>

<script>
import AppLogo from "@/components/icons/AppLogo";
import DashboardLayout from "@/views/layout/DashboardLayout";
import IconBaseTwo from "@/components/IconBaseTwo";
import SectionTitle from "@/components/SectionTitle";
import EdCoinTransactionPill from "../../components/EdCoinTransactionPill.vue";
import CoinsBottomNavBar from "@/components/CoinsBottomNavBar.vue";
import CoinsIcon from "../../components/icons/CoinsIcon.vue";
import SquareCheckIcon from "../../components/icons/SquareCheckIcon.vue";
import coin_routes from "../../router/coin_routes";
import CoinsRepository from "../../repositories/CoinsRepository";

export default {
  name: "CoinHome",
  data() {
    return {
      bottomBarClass: true,
      tabs: [],
      trxCount: 0,
      trxResult: [],
      availableMarks: 0,
      homeURL: this.$store.getters.getAuthUserRole == 'Teacher' ? 'teacher.home' : 'student.home',
    };
  },
  mounted() {
    console.log('CoinHome Mounted');

    // load up the transactions
    CoinsRepository.coinTrxList().then((res) => {
      console.log('get coins trx history', res);
      this.trxResult = res.data;
    })

    CoinsRepository.marksForCoinsList().then((response) => {
      console.log(response);
      this.availableMarks = response.data.marks.reduce((a, v) => {
        if(v.amount_redeemed === null){
          return a += v.final_marks;
        } else {
          return a;
        }
      }, 0);
    });

  },
  methods: {
    sliderUpdate(e){
      console.log('slider value', e.target.value);
      this.trxCount = parseInt(e.target.value);
    }

  },
  components: {
    AppLogo, DashboardLayout, IconBaseTwo, SectionTitle, EdCoinTransactionPill,
    SquareCheckIcon, CoinsIcon, CoinsBottomNavBar, coin_routes,
}
}

</script>

<style scoped>

</style>