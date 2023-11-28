<template>
  <div class="w-100">
    <div class="grid grid-cols-12 py-4">
      <div class="col-span-2"><InboxIcon /></div>
      <div class="col-span-2 my-auto"><ArrowRightIcon class="fill-current" :class="status >= 1 ? 'text-black' : 'text-gray-400'"/></div>
      <div class="col-span-2"><IndustryIcon class="fill-current" :class="status >= 1 ? 'text-black' : 'text-gray-400'" /></div>
      <div class="col-span-2 my-auto"><ArrowRightIcon class="fill-current" :class="status >= 2 ? 'text-black' : 'text-gray-400'"/></div>
      <div class="col-span-2"><TruckIcon class="fill-current" :class="status >= 2 ? 'text-black' : 'text-gray-400'"/></div>
    </div>
    <div class="grid grid-cols-7">
      <div class="col-span-1 text-3xl">
        <SquareCheckIcon />
      </div>
      <div class="col-span-6 text-left">Order Received</div>
    </div>
    <div :class="status >= 1 ? 'text-black' : 'text-gray-400'" class="grid grid-cols-7">
        <div class="col-span-1 text-3xl">
          <SquareCheckIcon class="fill-current" />
        </div>
        <div class="col-span-6 text-left">Processing by Seller</div>
    </div>
    <div :class="status >= 2 ? 'text-black' : 'text-gray-400'" class="grid grid-cols-7">
        <div class="col-span-1 text-3xl">
          <SquareCheckIcon class="fill-current" />
        </div>
        <div class="col-span-6 text-left">Complete</div>
    </div>
  </div>
</template>

<script>
import TruckIcon from '../icons/TruckIcon.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';
import InboxIcon from '../icons/InboxIcon.vue';
import SquareCheckIcon from '../icons/SquareCheckIcon.vue';
import IndustryIcon from '../icons/IndustryIcon.vue';

export default {
    props: {
        status: 0,
    },
    name: "OrderProgressCard",
    components: { TruckIcon, ArrowRightIcon, InboxIcon, SquareCheckIcon, IndustryIcon }
}
</script>