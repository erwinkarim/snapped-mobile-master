<template>
  <div class="">
    <div class="w-full bg-white flex flex-col fixed z-40">
      <div class="flex flex-row w-full justify-between pt-16 px-5">

        <nav-back class="w-1/3"/>

        <div class="text-lg font-bold text-purple-primary">
          {{ pageTitle }}
        </div>

        <div class="w-1/6  items-center justify-end flex flex-row">
          <icon-base-two stroke-color="red-primary" class=" w-1/3">
            <filter-icon/>
          </icon-base-two>
        </div>

      </div>

      <!-- Search Bar -->
      <div class="px-5 pb-5 w-full mt-2 flex flex-col relative justify-center">
        <div class="absolute w-1/12 mt-4 flex flex-row items-center justify-center ml-2">
          <icon-base-two class=" w-5/7">
            <magnifying-glass-icon stroke-color="purple-primary"/>
          </icon-base-two>
        </div>

        <input v-model="search"
               class="pl-12 pr-2 py-3 mt-4  appearance-none border rounded rounded-xl border-none w-full bg-gray-tertiary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
               id="username" type="text" placeholder="Search" autocomplete="off">
      </div>

    </div>

    <div class="top-45 relative mb-24">
      <slot/>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import NavBack from "@/components/NavBack";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";

export default {
  name: "LayoutTwo",
  props: {
    pageTitle: String
  },
  data(){
    return {
      search: ""
    }
  },
  components: {MagnifyingGlassIcon, NavBack, FilterIcon, IconBaseTwo, PageTitle}
}
</script>

<style scoped>

</style>
