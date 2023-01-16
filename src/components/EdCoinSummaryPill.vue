<template>
  <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
    <router-link :to="{ name: 'coin.home' }" class="flex flex-row items-center h-full text-left text-purple-primary">
      <div class="flex flex-col px-2 w-1/8">
        <CoinsIcon />
      </div>
      <div class="flex flex-col px-2 w-1/2">
        XX Coins
      </div>
      <div class="flex flex-col px-2 w-1/2">
        Ed Coins here
      </div>
    </router-link>
  </div>
</template>

<script>

import CoinsIcon from './icons/CoinsIcon.vue';

export default {
    name: "EdCoinSummaryPill",
    mounted() {
        console.log('edcoin pill mounted');
    },
    components: {
        CoinsIcon
    }

}

</script>

<style scoped>

</style>