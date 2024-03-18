<template>
  <section id="bottom-navigation">

    <div id="tabs" class="flex flex-row md:max-w-2xl h-full items-center justify-around mx-auto md:w-6/7">
      <router-link v-for="tab in tabs"
                   :key="tab.routeName"
                   :to="{name: tab.routeName}"
                   class=" w-1/5 pt-1 flex flex-row justify-center items-center"
                   exact
      >
        <div class="w-5/7 md:w-4/7">
          <bottom-navbar-icon-base :tab-name="tab.tabName" :icon="tab.icon" />
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>

import { shallowRef,  ref, computed } from 'vue'
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
      // let userRole = 'Student';
      let userRole = this.$store.getters.getAuthUserRole;


      if (userRole === 'Teacher') {
        this.tabs = shallowRef(teacher_tabs);
      }
      if (userRole === 'Student') {
        this.tabs = shallowRef(student_tabs);
      }

    }
  }
}
</script>

<style scoped>
</style>
