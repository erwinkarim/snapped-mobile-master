<template>
  <section id="bottom-navigation"
           class="md:hidden block fixed inset-x-0 border-t-1/4 bottom-0 z-40 shadow bg-white h-14">

    <div id="tabs" class="flex flex-row h-full items-center justify-around">
      <router-link :to="{name: tab.routeName}" :key="tab.routeName" v-for="tab in tabs" class=" w-1/5 pt-1 flex flex-row justify-center items-center" exact>
        <div class="w-5/7">
          <bottom-navbar-icon-base :tab-name="tab.tabName" :icon="tab.icon" />
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>

import BottomNavbarIconBase from "@/components/BottomNavbar/BottomNavbarIconBase";
import teacher_tabs from "@/components/BottomNavbar/teacher_tabs";
import student_tabs from "@/components/BottomNavbar/student_tabs";

export default {
  name: "BottomNavbar",
  data() {
    return {
      tabs: []
    }
  },
  components: {
    BottomNavbarIconBase,
  },
  mounted() {
    this.getTabs()
  },
  methods: {
    getTabs() {
      let userRole = this.$store.getters.getAuthUserRole;

      if (userRole === 'Teacher') {
        this.tabs = teacher_tabs;
      }
      if (userRole === 'Student') {
        this.tabs = student_tabs;
      }

    }
  }
}
</script>

<style scoped>
</style>
