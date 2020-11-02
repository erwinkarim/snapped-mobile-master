<template>
  <div class="">
    <div class="w-full bg-white flex flex-col fixed z-40">

      <div class="flex flex-row w-full justify-between pt-16 px-5">

        <page-title class="w-3/4">Class</page-title>

        <div class="w-1/6">
          <icon-base-two>
            <magnifying-glass-icon stroke-color="red"/>
          </icon-base-two>
        </div>
      </div>

      <!-- TABS -->
      <div class="px-5 pb-4 w-full flex flex-row mt-4">
        <router-link @click.native="changeTab({tabName: 'classmates'})" :to="{name: 'student.class'}"  :class="isActiveTab('classmates')" class=" opacity-100 hover:opacity-75 text-xs-plus font-bold py-2 px-4 rounded-lg w-1/2 mr-3">
          CLASSMATES
        </router-link>
        <router-link @click.native="changeTab({tabName: 'teachers'})" :to="{name: 'student.class.teacher'}"  :class="isActiveTab('teachers')" class=" opacity-100 hover:opacity-75  text-xs-plus font-bold py-2 px-4 rounded-lg w-1/2">
          TEACHERS
        </router-link>
      </div>

    </div>

    <router-view class=" top-46 relative mb-24"/>
  </div>
</template>

<script>
import NavBack from "@/components/NavBack";
import IconBase from "@/components/IconBase";
import FilterIcon from "@/components/icons/FilterIcon";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";
import PageTitle from "@/components/PageTitle";
import IconBaseTwo from "@/components/IconBaseTwo";

export default {
  name: "StudentClass",
  data() {
    return {
      path:'',
      activeTab: 'classmates',
    }
  },
  watch: {
    'activeTab' : 'isActiveTab'
  },
  methods: {
    changeTab({tabName: tabName}){
      this.activeTab = tabName;
    },
    isActiveTab(tabName){
      if (this.activeTab === tabName) {
        return 'bg-purple-primary text-white'
      } else {
        return 'bg-gray-secondary text-purple-primary text-opacity-75'
      }
    },
    getInitialActiveTab () {

      let path = this.$route.path;

      if (path.includes('/teachers')) {
        this.activeTab = 'teachers';
      }

      if (path.includes('/ranking')) {
        this.activeTab = 'ranking';
      }
    },
  },
  created() {
    this.getInitialActiveTab()
  },
  components: {IconBaseTwo, PageTitle, MagnifyingGlassIcon, FilterIcon, IconBase, NavBack}
}
</script>

<style scoped>

</style>
