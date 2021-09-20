<template>
  <div class="h-full mx-auto">

    <div class="flex flex-row w-full max-w-xl md:mx-auto">
      <slot name="pageHeader"/>
    </div>

    <div :class="contentClass" class="flex flex-col w-screen md:mx-auto md:items-center max-w-xl">
      <slot name="content"/>
    </div>

    <div v-if="hasCustomBottomBar" :class="bottomBarClass" class=" block fixed inset-x-0  bottom-0 z-30 md:z-40 shadow pt-4 pb-6 px-5">
      <div class="flex flex-row h-full items-center justify-around">
        <slot name="bottomBar"/>
      </div>
    </div>
    <div v-else-if="noBottomBar">

    </div>
    <div v-else>
<!--      <bottom-navbar class="block fixed inset-x-0 border-t-1/4 bottom-0 z-40 shadow bg-white h-14 md:h-20"/>-->
      <bottom-navbar class="block fixed inset-x-0 border-t-1/4 bottom-0 z-40 lg:z-50 xl:z-70 shadow bg-white h-14 md:h-20"/>
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
    hasBottomBarBorder: {
      type: Boolean,
      default: true
    },
    noBottomBar: {
      type: Boolean,
      default: false
    },
    bottomBarColor: {
      type: String,
      default: 'bg-white'
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
    },
    bottomBarClass: function () {
      let value = '';

      value += this.bottomBarColor

      if (this.hasBottomBarBorder) {
        value += ' border-t-1/4'
      }

      return value;
    }
  },
  components: {BottomNavbar},
}
</script>

<style scoped>

</style>
