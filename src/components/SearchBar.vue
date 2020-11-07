<template>
  <div class="px-5 pb-4 w-full z-40 bg-white flex flex-row items-center">
    <div class="absolute w-1/12 mt-4 flex flex-row items-center justify-center ml-2">
      <icon-base-two class="w-5/7">
        <magnifying-glass-icon stroke-color="purple-primary"/>
      </icon-base-two>
    </div>
    <input v-model="search"
           class="pl-12 pr-2 py-3 mt-4  appearance-none border rounded rounded-xl border-none w-full bg-gray-tertiary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
           type="text" placeholder="Search" autocomplete="off">
  </div>
</template>

<script>
import IconBaseTwo from "@/components/IconBaseTwo";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
export default {
  name: "SearchBar",
  components: {MagnifyingGlassIcon, IconBaseTwo},
  data () {
    return {
      search: ''
    }
  }
}
</script>

<style scoped>

</style>
