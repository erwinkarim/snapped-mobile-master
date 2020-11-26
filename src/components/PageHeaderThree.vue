<!--
  NAME: Page Header Three
  DESCRIPTION:
    - A combination of Page Header One and Page Header Two.
    - On downwards page scroll, page title transitions into mini title.
    - Has option to include search bar.
-->

<template>
  <!-- HEADER -->
  <div :class="containerClass" class="w-full flex flex-col z-40" v-scroll="handleScroll">

    <!-- LEFT ACTION (NAVBACK/CANCEL) + MINI TITLE + RIGHT ACTION -->
    <div :class="headerClass" class="flex flex-row w-full justify-between  px-1 ">

      <div class="w-3/12 items-center justify-center flex-row flex justify-start">
        <slot name="leftAction"/>
      </div>

      <div :class="pageTitleTwoClass" class="w-6/12 text-lg font-bold text-purple-primary">
        <slot name="mini-title"/>
      </div>

      <div class="w-3/12">
        <slot name="rightAction"/>
      </div>
    </div>

    <!-- MAIN TITLE  -->
    <div v-if="hasScrollAnimation" :class="pageTitleClass" class="w-full px-5 mt-24 break-all overflow-hidden ">
      <div class="text-left text-4xl font-bold text-purple-primary">
        <slot name="title" />
      </div>
    </div>

    <!-- SEARCH BAR -->
    <div v-if="hasSearchBar" :class="searchBarClass"
         class="px-5 pb-4 w-full z-50 bg-white flex flex-row items-center">
      <div class="absolute w-1/12 mt-2 flex flex-row items-center justify-center ml-2">
          <icon-base-two class="w-5/7">
            <magnifying-glass-icon stroke-color="purple-primary"/>
          </icon-base-two>
      </div>
      <input v-model="search" @keyup="emitSearch"
             class="pl-12 pr-2 py-3 mt-4  appearance-none border rounded rounded-xl border-none w-full bg-gray-tertiary text-purple-secondary text-lg font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary"
             type="text" placeholder="Search" autocomplete="off">
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
  name: "PageHeaderThree",
  props: {
    hasSearchBar: {
      type: Boolean,
      default: false
    },
    hasScrollAnimation: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: false
    },
    bottomPadding: {
      type: Number,
      default: 0
    },
    backgroundColor:{
      type: String,
      default: 'bg-white'
    },
    headerCustomClass: {
      type: String,
      default: 'pt-3/24'
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
        return 'transition-opacity duration-400 opacity-100'
    },
    pageTitleTwoClass: function () {

      if (this.isScrolledDownTwo && this.hasScrollAnimation) {
        return 'transition-opacity duration-400 opacity-100'
      }
      if (!this.isScrolledDownTwo && this.hasScrollAnimation) {
        return 'transition-opacity duration-100 opacity-0'
      }

      return 'opacity-100'

    },
    searchBarClass: function () {
      if (this.setStickySearchBar && this.hasScrollAnimation) {
        return 'fixed top-24'
      }

      if (!this.hasScrollAnimation) {
        return 'relative pt-4'
      }

      return ''
    },
    headerClass: function () {


      let value = '';

      value += this.backgroundColor;
      value += ' ' + this.headerCustomClass;

      if( this.hasScrollAnimation) {
        value += ' fixed pb-6'
      }

      return value;

    },
    containerClass: function () {

      let value = '';

      value += this.backgroundColor;
      value += ' pb-' + this.bottomPadding;

      if (this.hasBottomBorder) {
        value += ' border-b-1 border-gray-primary border-opacity-15'
      }

      if (!this.hasScrollAnimation) {
        value += ' fixed'
      }

      return value;
    }
  },
  methods: {
    handleScroll: function (evt, el) {
      this.isScrolledDownOne = window.scrollY > 32
      this.isScrolledDownTwo = window.scrollY > 58
      this.setStickySearchBar = window.scrollY > 60
    },
    emitSearch(value) {
      this.$emit('search', this.search)
    }
  },
  components: {MagnifyingGlassIcon, PageTitle, FilterIcon, IconBaseTwo, NavBack}
}
</script>

<style scoped>

</style>
