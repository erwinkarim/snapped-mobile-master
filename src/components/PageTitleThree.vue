<template>
  <!-- HEADER -->
  <div class="w-full bg-white flex flex-col z-40" v-scroll="handleScroll">

    <div :class="headerClass" class="flex flex-row w-full justify-between fixed pt-16 px-5 z-40 bg-white">

      <div class="w-1/12 items-center justify-center flex-row flex">
        <slot name="leftAction"/>
      </div>

      <div :class="pageTitleTwoClass" class="w-9/12 text-lg font-bold text-purple-primary">
        <slot name="mini-title"/>
      </div>

      <div class="w-2/12">
        <slot name="rightAction"/>
      </div>
    </div>

    <page-title class="w-full px-5 mt-26 break-all overflow-hidden ">
      <slot name="title" :class="pageTitleClass"/>
    </page-title>

    <div class="px-5 pb-5 w-full mt-2 flex flex-col relative justify-center">
      <slot name="searchBar" />
    </div>
  </div>
</template>

<script>
import NavBack from "@/components/NavBack";
import IconBaseTwo from "@/components/IconBaseTwo";
import FilterIcon from "@/components/icons/FilterIcon";
import PageTitle from "@/components/PageTitle";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";

export default {
  name: "PageTitleThree",
  props: {
    hasSearchBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      isScrolledDownOne: false,
      isScrolledDownTwo: false,
      setStickySearchBar: false
    }
  },
  computed: {
    pageTitleClass: function () {

      if (this.isScrolledDownOne) {
        return 'transition-opacity duration-100 opacity-0'
      }
      if (this.isScrolledDownTwo) {
        return 'transition-opacity duration-100 opacity-0'
      }

      return 'transition-opacity duration-400 opacity-100'

    },
    pageTitleTwoClass: function () {
      if (this.isScrolledDownTwo) {
        return 'transition-opacity duration-400 opacity-100'
      }

      return 'transition-opacity duration-100 opacity-0'
    },
    searchBarClass: function () {
      if (this.setStickySearchBar) {
        return 'fixed top-26'
      }

      return ''
    },
    headerClass: function () {
      if (this.isScrolledDownTwo) {
        return 'pb-6'
      }
    },
  },
  methods: {
    handleScroll: function (evt, el) {
      this.isScrolledDownOne = window.scrollY > 32
      this.isScrolledDownTwo = window.scrollY > 43
      this.setStickySearchBar = window.scrollY > 54
    }
  },
  components: {MagnifyingGlassIcon, PageTitle, FilterIcon, IconBaseTwo, NavBack}
}
</script>

<style scoped>

</style>
