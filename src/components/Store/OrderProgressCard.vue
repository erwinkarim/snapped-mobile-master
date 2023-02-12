<template>
  <div>
    <div class="grid grid-cols-7">
      <div class="col-span-1 text-3xl">&boxDR;</div>
      <div class="col-span-6 text-left">Order Received</div>
    </div>
    <div :class="status >= 1 ? 'text-black' : 'text-gray-400'" class="grid grid-cols-7">
        <div class="col-span-1 text-3xl">&boxVR;</div>
        <div class="col-span-6 text-left">Process by Seller</div>
    </div>
    <div :class="status >= 2 ? 'text-black' : 'text-gray-400'" class="grid grid-cols-7">
        <div class="col-span-1 text-3xl">&boxUR;</div>
        <div class="col-span-6 text-left">Complete</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: 0,
  },
  name: "OrderProgressCard",
}
</script>