<template>
  <div class="h-screen">

    <div class="flex flex-row">
      <slot name="pageHeader"/>
    </div>

    <div :class="contentClass" class="flex flex-col w-screen ">
      <slot name="content"/>
    </div>

    <div v-if="hasCustomBottomBar"
         class="md:hidden block fixed inset-x-0 border-t-1/4 bottom-0 z-10 shadow bg-white pt-4 pb-6 px-5">
      <div class="flex flex-row h-full items-center justify-around">
        <slot name="bottomBar"/>
      </div>
    </div>
    <div v-else-if="noBottomBar">

    </div>
    <div v-else>
      <bottom-navbar/>
    </div>

  </div>
</template>

<script>
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";

export default {
  name: "DashboardLayout",
  props: {
    hasFixedHeader: {
      type: Boolean,
      default: false
    },
    hasCustomBottomBar: {
      type: Boolean,
      default: false
    },
    noBottomBar: {
      type: Boolean,
      default: false
    },
    contentFillsScreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentClass: function () {

      let value = '';

      if (this.hasFixedHeader) {
        value += 'relative'
      }

      if (this.contentFillsScreen) {
        value += ' h-full pb-10'
      } else {
        value += ' mb-24'
      }

      return value;
    }
  },
  components: {BottomNavbar},
}
</script>

<style scoped>

</style>
