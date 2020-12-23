<template>
  <div class="h-full bottom-0">

    <div id="header" class=" w-full bg-white flex flex-col  z-40 fixed" >

      <page-title title="Class">

        <template v-slot:rightAction>
          <div class="flex flex-row justify-end items-center ">
            <router-link :to="{name: 'student.class.classmates'}" class="w-1/7 bg-white ">
              <icon-base-two>
                <magnifying-glass-icon stroke-color="red-primary"/>
              </icon-base-two>
            </router-link>
            <router-link :to="{name: 'student.class.school_ranking'}" class="ml-2">
              School Rank
            </router-link>
          </div>
        </template>
      </page-title>

      <!-- TABS -->
      <div class="px-5 pb-4 w-full flex flex-row mt-4">
        <router-link
                     :to="{name: 'student.class'}"
                     :class="$route.name === 'student.class' ? 'bg-purple-primary text-white' : 'bg-gray-secondary text-purple-primary text-opacity-75'"
                     class=" opacity-100 hover:opacity-75 text-xs-plus font-bold py-2 px-4 rounded-lg w-1/2 mr-3">
          CLASSMATES
        </router-link>
        <router-link :to="{name: 'student.class.teacher'}"
                     :class="$route.name === 'student.class.teacher' ? 'bg-purple-primary text-white' : 'bg-gray-secondary text-purple-primary text-opacity-75'"
                     class=" opacity-100 hover:opacity-75  text-xs-plus font-bold py-2 px-4 rounded-lg w-1/2">
          TEACHERS
        </router-link>
      </div>
    </div>

    <div class="relative" id="content" :style="contentStyle">
      <slot/>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import IconBaseTwo from "@/components/IconBaseTwo";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";

export default {
  name: "LayoutOne",
  data() {
    return {
      path: '',
      headerHeight: 0,
    }
  },
  computed: {
    contentStyle() {
      if (this.headerHeight > 0) {
        return {
          'margin-top': `${this.headerHeight}px`}
      }
    }
  },
  methods: {
    isActiveTab(tabName) {
      if (this.activeTab === tabName) {
        return 'bg-purple-primary text-white'
      } else {
        return 'bg-gray-secondary text-purple-primary text-opacity-75'
      }
    },
    getSetHeaderHeight(){

      let header = document.getElementById('header');
      this.headerHeight = header.offsetHeight;
    }
  },
  mounted() {
    this.getSetHeaderHeight()
  },
  components: {MagnifyingGlassIcon, IconBaseTwo, PageTitle}
}
</script>

<style scoped>

</style>
