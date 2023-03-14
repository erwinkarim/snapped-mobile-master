<template>
  <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
    <router-link :to="{ name: 'coin.home' }" class="flex flex-row items-center h-full text-left text-purple-primary">
      <div class="flex flex-col px-2 w-1/8">
        <CoinsIcon />
      </div>
      <div class="flex flex-col px-2 w-1/2">
        {{ trxResult.length === 0 ? 0 : trxResult.at(0).balance }} Coins
      </div>
      <div class="flex flex-col px-2 w-1/2">
        Get More Coins
      </div>
    </router-link>
  </div>
</template>

<script>

import CoinsIcon from './icons/CoinsIcon.vue';
import CoinsRepository from "@/repositories/CoinsRepository";

export default {
    name: "EdCoinSummaryPill",
    data() {
      return {
        trxResult: [],
      }
    },
    mounted() {
      // load up the transactions
      CoinsRepository.coinTrxList().then((res) => {
        console.log('get coins trx history', res);
        this.trxResult = res.data;
      });
    },
    components: {
        CoinsIcon
    }

}

</script>

<style scoped>

</style>