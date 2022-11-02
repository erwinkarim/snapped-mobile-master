<template>
  <div class="mt-2 mb-3">
    <div class="flex flex-row w-full">
      <div class="flex flex-col w-1/2 text-left">{{ (date).toLocaleString('en-GB') }}</div>
      <div class="flex flex-col w-1/2 text-right">Details</div>
    </div>
    <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
      <div class="flex flex-row items-center h-full text-left text-purple-primary">
        <div class="flex flex-col px-2 w-full">
          Transaction ID: {{trxID }}
        </div>
      </div>
      <div class="flex flex-row items-center h-full text-left text-purple-primary">
        <div class="flex flex-col px-2 w-full">
          Transaction Amount: <div :class="{ 'text-green-600': isPositive }" >{{ trxAmount }}</div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  computed: {
    isPositive() { return this.trxAmount > 0; },

  }, 
  props: {
    date: Date,
    trxID: Number,
    trxAmount: { default: 0, type: Number },
  }, 
  name: "EdCoinTransactionPill",
  mounted() {
    console.log("EdCoinTransactionPill mounted");
  }
}

</script>

<style scoped>

</style>