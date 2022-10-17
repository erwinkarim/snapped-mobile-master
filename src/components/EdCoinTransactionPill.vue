<template>
  <div class="mt-2 mb-3">
    <div class="flex flex-row w-full">
      <div class="flex flex-col w-1/2 text-left">Date</div>
      <div class="flex flex-col w-1/2 text-right">Something Here</div>
    </div>
    <div class="overflow-hidden justify-between py-3 px-3 max-w-sm md:max-w-xl h-full rounded rounded-xl bg-gray-secondary">
      <div class="flex flex-row items-center h-full text-left text-purple-primary">
        <div class="flex flex-col px-2 w-full">
          Transaction ID
        </div>
      </div>
      <div class="flex flex-row items-center h-full text-left text-purple-primary">
        <div class="flex flex-col px-2 w-full">
          Transaction Amount
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "EdCoinTransactionPill",
  mounted() {
    console.log("EdCoinTransactionPill mounted");
  }
}

</script>

<style scoped>

</style>