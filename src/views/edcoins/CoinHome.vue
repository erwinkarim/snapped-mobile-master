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

      <div class="px-5 w-full md:px-10">
        <!-- total marks -->
        <div class="mt-2 mb-3">
          <section-title class="mb-5 text-left" title="Marks"/>
          <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
            <div class="flex flex-row items-center h-full text-left text-purple-primary">
              <div class="flex flex-col px-2 w-1/8">
                <SquareCheckIcon />
              </div>
              <div class="flex flex-col px-2 w-3/8">
                1234 Marks
              </div>
              <router-link class="flex flex-col px-2 w-1/2 text-right" :to="{ name: 'coin.top_up_redeem_marks' }">
                Redeem
              </router-link>
            </div>
          </div>
        </div>


        <!-- total coins -->
        <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
          <div class="flex flex-row items-center h-full text-left text-purple-primary">
            <div class="flex flex-col px-2 w-1/8">
              <CoinsIcon />
            </div>
            <div class="flex flex-col px-2 w-3/8">
              1234 Coins
            </div>
              <router-link class="flex flex-col px-2 w-1/2 text-right" :to="{ name: 'coin.top_up_buy' }">
                Top-Up
              </router-link>
          </div>
        </div>
      </div>

      <div class="px-5 w-full md:px-10">
        <!-- transaction history -->
        <p>transaction history here</p>
        <div class="mt-2 mb-3">
          <input type="range" min="0" max="50" :value=trxCount class="slider" id="myRange" @change="sliderUpdate" />
          <p>Showing {{ trxCount }} transaction(s)</p>
        </div>

        <div class="mt-2 mb-3">
          <section-title class="mb-5 text-left" title="Transaction History" />
          <div v-if="trxCount == 0">
            No transactions
          </div>
          <div v-else>
            <div v-for="trx in trxCount">
              <router-link :to="{ name: 'coin.trxDetail', params: { trxID: trxResult[trx].id }}">
                <EdCoinTransactionPill :trxID=trxResult[trx].id :trxAmount=trxResult[trx].amount  :date=trxResult[trx].date />
              </router-link>
            </div>
          </div>
        </div>
      </div>

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

export default {
  name: "CoinHome",
  data() {
    return {
      bottomBarClass: true,
      tabs: [],
      trxCount: 0,
      trxResult: [],
      homeURL: this.$store.getters.getAuthUserRole == 'Teacher' ? 'teacher.home' : 'student.home',
    };
  },
  mounted() {
    console.log('CoinHome Mounted');

    // for demo: generate random data
    for (let i = 0; i<50; i++){ 
      var num = Math.random() * 150;
      this.trxResult.push({
        id: i,
        amount: Math.round((num + Number.EPSILON) * 100) / 100,
        date: new Date( parseInt(1000000000 + Math.random() * 1000000000000)),
      })
    }
    this.trxCount = 10;

    /* 
      for production: check auth and get info
      - current marks and coins ledger
      - recent transactions 
    */

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